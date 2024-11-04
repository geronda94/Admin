<script setup>
import axios from "axios";
import { inject, provide, ref, watch } from "vue";
import FileItem from "../ui/FileItem.vue";
import Modal from "../Modal/Modal.vue";


const lang = inject("lang");
const API = inject("API");
const files = ref([]); // Все файлы и папки, загружаемые из API
const currentPath = ref("/"); // Текущий путь
const currentFiles = ref([]); // Содержимое текущей папки
const pathArray = ref([{ name: "root", path: "/" }]); // Для отображения пути
const showInputField = ref(false); // Переключатель видимости поля
const folderName = ref(""); // Название новой папки

const showModal = ref(false);
const selectedFileName = ref("");
const selectedFilePath = ref("")

const shopUploadField = ref(false);
const isUploading = ref(false);
const selectedFiles = ref([]);
const uploadStatus = ref([]); // Состояние загрузки каждого файла в процентах



const cutFiles = ref([]);
const isMoveMode = ref(false);




const emits = defineEmits(['updateSelectedFiles']);
watch(selectedFiles, (newFiles) => {
  emits('updateSelectedFiles', newFiles); // Передача обновленного списка файлов
});



const initiateMoveMode = () => {
    cutFiles.value = [...selectedFiles.value];
    selectedFiles.value = [];
    isMoveMode.value = true;
};

const toggleSelection = (filePath) => {
  const index = selectedFiles.value.indexOf(filePath);
  if (index > -1) {
    // Удаляем файл, если он уже выбран
    selectedFiles.value.splice(index, 1);
  } else {
    // Добавляем файл, если он не выбран
    selectedFiles.value.push(filePath);
  }
  emits('updateSelectedFiles', selectedFiles.value);
};




const completeMove = async () => {
    try {
        // Перемещаем файлы по одному
        for (const sourcePath of cutFiles.value) {
            const response = await axios.post(`${API}/file/move`, {
                source_path: sourcePath,
                destination_path: currentPath.value
            }, {
                withCredentials: true
            });

            if (response.data.status !== "Move successful") {
                console.error(`Error moving file ${sourcePath}:`, response.data.detail);
            } 
        }
        
        // Очистка после завершения
        cutFiles.value = [];
        isMoveMode.value = false;
        fetchData()

    } catch (error) {
        console.error('Error moving files:', error);
    }
};



const cancelMove = () => {
    selectedFiles.value = [];
    cutFiles.value = [];
    isMoveMode.value = false;
};


//Функции отвечающие за удаление файлов
const dropSelected = async () => {
  if (selectedFiles.value.length === 0) {
    console.log("Нет выделенных файлов для удаления.");
    return;
  }

  const fileCount = selectedFiles.value.length;
  const hasDirectory = selectedFiles.value.some((file) => file.isDirectory); // Предполагаем, что у вас есть поле isDirectory для проверки, является ли файл папкой

  let confirmationMessage = `Вы действительно хотите удалить ${fileCount} файл(ов) и папок?`;

  const confirmed = confirm(confirmationMessage);
  if (!confirmed) {
    console.log("Удаление отменено пользователем.");
    return;
  }

  try {
    for (const file of selectedFiles.value) {
        console.log(file)
      const response = await axios.delete(`${API}/file/delete-file`, {
        params: { file_path: encodeURIComponent(file)},
        withCredentials: true, // Предполагаем, что fullPath содержит путь к файлу
        
      });

      console.log(response.data.status); // Логируем статус удаления
    }
    // Очищаем список выделенных файлов после удаления
    selectedFiles.value = [];
    fetchData(); // Обновляем данные после удаления
  } catch (error) {
    console.error("Ошибка при удалении файлов:", error);
  }
};


//Загрузка файлов на сервер
const uploadFiles = async () => {
  if (selectedFiles.value.length === 0) {
    alert("Файлы не выбраны");
    return;
  }

  isUploading.value = true; // Показываем индикатор загрузки

  try {
    for (let i = 0; i < selectedFiles.value.length; i++) {
      const file = selectedFiles.value[i];

      const formData = new FormData();
      formData.append("file", file); // Добавляем текущий файл в FormData
      formData.append("path", currentPath.value); // Добавляем путь

      await axios.post(`${API}/file/upload-file`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
        onUploadProgress: (progressEvent) => {
          const percentCompleted = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          uploadStatus.value[i] = percentCompleted; // Обновляем статус для текущего файла
        },
      });
    }
  } catch (error) {
    alert("Ошибка при загрузке файлов:", error);
    uploadStatus.value.fill("Ошибка"); // Обновляем статус в случае ошибки
  } finally {
    isUploading.value = false; // Скрываем индикатор загрузки
    selectedFiles.value = []; // Очищаем выбранные файлы
    fetchData(); // Обновляем данные после загрузки
    setTimeout(() => {
      shopUploadField.value = false;
    }, 300);
  }
};

const handleFileChange = (event) => {
  selectedFiles.value = Array.from(event.target.files); // Сохраняем выбранные файлы
  uploadStatus.value = Array(selectedFiles.value.length).fill(0); // Инициализируем статус загрузки на 0%
};

const selectAll = () => {
    selectedFiles.value = []

    for (let item of currentFiles.value) {
        if (item.fullPath) {
            selectedFiles.value.push(item.fullPath);
        }
    }
};




//Получаем данные о файлах на сервере
const fetchData = async () => {
  try {
    const result = await axios.get(`${API}/file/all-files`, {
      withCredentials: true,
    });
    if (result.status === 200) {
      files.value = result.data.files;
      updateCurrentFiles(); // Инициализация содержимого первой папки
    }
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};


//Фнукци
const updateCurrentFiles = () => {
  const pathParts = currentPath.value.split("/").filter(Boolean); // Разделить текущий путь на части
  let tempFiles = files.value;

  // Рекурсивно найти файлы внутри текущего пути
  for (const part of pathParts) {
    const folder = tempFiles.find(
      (item) => item.name === part && item.type === "folder"
    );
    if (folder) {
      tempFiles = folder.content; // Переходим внутрь папки
    } else {
      tempFiles = []; // Если путь не найден, оставить пустой
      break;
    }
  }
  currentFiles.value = tempFiles;

  pathArray.value = [{ name: "root", path: "/" }]; // Сброс начального пути
  for (let i = 0; i < pathParts.length; i++) {
    const subPath = pathParts.slice(0, i + 1).join("/");
    pathArray.value.push({ name: pathParts[i], path: `/${subPath}` });
  }
};

const createFolder = async () => {
  console.log(currentPath.value);
  if (folderName.value.trim()) {
    try {
      await axios.post(
        `${API}/file/create-folder`,
        {
          path: currentPath.value, // путь для создания папки
          folder_name: folderName.value.trim(), // название новой папки
        },
        { withCredentials: true }
      );
      console.log("Папка успешно создана");
      fetchData();
    } catch (error) {
      console.error("Ошибка при создании папки:", error);
    } finally {
      folderName.value = "";
      showInputField.value = false;
    }
  }
};

const handleDoubleClick = (item) => {
  if (item.type === "file") {
    selectedFileName.value = item.name;
    selectedFilePath.value = item.fullPath;
    showModal.value = true; // Показываем модальное окно
  } else if (item.type === "folder") {
    enterFolder(item.name); // Вход в папку
  }
};

const enterFolder = (folderName) => {
  currentPath.value = `${currentPath.value.replace(/\/$/, "")}/${folderName}/`; // Добавление папки в конец текущего пути
  updateCurrentFiles();
};

const goBack = () => {
  const pathParts = currentPath.value.split("/").filter(Boolean);
  if (pathParts.length > 0) {
    pathParts.pop(); // Удалить последнюю часть пути
    currentPath.value = `/${pathParts.join("/")}/`; // Преобразовать в путь с '/'
    updateCurrentFiles();
  }
};

const navigateToPath = (path) => {
  currentPath.value = path;
  updateCurrentFiles();
};

watch(currentPath, () => {
  selectedFiles.value = []; // Очистка массива выбранных файлов
});

fetchData();
</script>
<template>
  <div class="main__content">
    <!-- Меню навигации между файлами-->
    <div :class="['media__header', ]">
      <div class="path__nav">
        <button type="button" class="back__button" @click="goBack">
          <font-awesome-icon :icon="['fas', 'arrow-left']" />
        </button>
        <span v-for="(folder, index) in pathArray" :key="folder.path">
          <a class="folder__link" @click.prevent="navigateToPath(folder.path)">
            <span v-if="folder.name == 'root'"
              ><font-awesome-icon :icon="['fas', 'house']"
            /></span>
            <span v-else>{{ folder.name }}</span>
          </a>
          <span v-if="index < pathArray.length - 1"> &nbsp;/&nbsp; </span>
        </span>
      </div>



      <!-- Меню перемещения -->
       <div class="media__functions">
        <div>
            <div v-if="isMoveMode" class="path__nav media__functions">
                <div class="selected__files">
                    <span @click="cancelMove" class="folder__link">
                        <font-awesome-icon :icon="['fas', 'xmark']" />
                    </span>
                    <span @click="completeMove(destinationPath)" class="folder__link">
                        <font-awesome-icon :icon="['fas', 'check']" />
                    </span>
                    <span class="selected__count">Move: {{ cutFiles.length }} elements</span>
                </div>
            </div>
            <!-- Обычное меню -->
            <div v-else class="path__nav media__functions">
                <div v-if="selectedFiles.length" class="selected__files">
                    <span @click="dropSelected" class="folder__link">
                    <font-awesome-icon :icon="['fas', 'trash']" />
                    </span>
                    <span @click="initiateMoveMode" class="folder__link">
                    <font-awesome-icon :icon="['fas', 'up-down-left-right']" />
                    </span>
                    <span class="selected__count">Selected: {{ selectedFiles.length }} elements</span>
                    <span @click="selectedFiles = []" class="folder__link">
                    <font-awesome-icon :icon="['fas', 'xmark']" />
                    </span>
                    <span @click="selectAll" class="folder__link">
                    <font-awesome-icon :icon="['fas', 'check-double']" />
                    </span>
                </div>
            </div>
          </div>  
        

      
        


        <!-- Меню загрузки и добавления папок -->
        <div class=" media__functions">
            <span @click="shopUploadField = !shopUploadField" class="folder__link">
              <font-awesome-icon :icon="['far', 'file-lines']" />
            </span>
            <span class="folder__link" @click="showInputField = !showInputField">
              <font-awesome-icon :icon="['fas', 'folder-plus']" />
            </span>
        </div>
    </div>
        <!-- Модальные окна загрузки и добавления папок -->
        <div v-if="shopUploadField" class="input__container">
          <input
            v-if="!isUploading"
            type="file"
            @change="handleFileChange"
            placeholder="Выберите файл"
            multiple
          />
        
          <div v-if="isUploading" class="uploading-indicator">
            <p class="upload__header">Загрузка файлов...</p>
            <!-- Индикатор загрузки -->
            <div v-for="(file, index) in selectedFiles" :key="index">
              <div v-if="uploadStatus[index]<100" class="upload__status">
                <div class="upload__name">{{ file.name }}</div>
                <progress  :value="uploadStatus[index]" max="100"></progress>
              </div>
            </div>
          </div>

          <span v-if="!isUploading" @click="uploadFiles" class="folder__link">
            <font-awesome-icon :icon="['fas', 'check']" />
          </span>
          <span
            v-if="!isUploading"
            @click="shopUploadField = false"
            class="folder__link"
          >
            <font-awesome-icon :icon="['fas', 'xmark']" />
          </span>
        </div>

        <div v-if="showInputField" class="input__container">
          <input
            v-model="folderName"
            @blur="createFolder"
            type="text"
            placeholder="Введите название папки"
            @keydown.enter="createFolder"
          />
          <span @click="createFolder" class="folder__link">
            <font-awesome-icon :icon="['fas', 'check']" />
          </span>
          <span @click="showInputField = false" class="folder__link">
            <font-awesome-icon class="" :icon="['fas', 'xmark']" />
          </span>
        </div>
      </div>
    
    
    
    <!-- Конец навигации -->






    <!-- Основной контент с отображением файлов и папок в текущей директории -->
    <div class="files__wrapper">
      <div
        :class="[
          'file__wrapper',
          { checked: selectedFiles.includes(item.fullPath) },
        ]"
        v-for="item in currentFiles"
        :key="item.fullPath"
        @click="toggleSelection(item.fullPath)"
      >
        
          <FileItem
            :type="item.type"
            :name="item.name"
            :full-path="item.fullPath"
            @dblclick="handleDoubleClick(item)"
          />
        
      </div>
    </div>

  </div>



  <!--  Модальное окно с показом фоток по двойному клику -->
  <Modal
    v-if="showModal"
    :show="showModal"
    @close="showModal = false"
    :headerTitle="selectedFileName"
  >
    <template #body>
      <img :src="API + '/static/' + selectedFilePath" alt="" />
    </template>
  </Modal>





</template>

<style>
input[type="checkbox"] {
  opacity: 0; /* Делает чекбокс невидимым */
  position: absolute; /* Убирает его из потока документа */
  pointer-events: none; /* Отключает возможность взаимодействия с ним напрямую */
}
.media__header {
  display: flex;
  justify-content: space-between;
  width: calc(100% - 350px);
  margin-top: 2px;
  padding: 10px;
  position: fixed;
  background: white;
  outline: 2px solid white;
}
.media__functions {
  display: flex;
  gap: 15px;

}
.folder__link {
  font-size: 22px;
  font-family: "Open Sans";
  color: var(--color-prime);
  cursor: pointer;
  text-decoration: underline;
  transition: 0.3;
}
.folder__link span{
    font-size: 16px;
}

.folder__link:hover {
  color: var(--color-sky);
  transition: 0.3;
}
.path__nav button {
  margin-right: 10px;
  padding: 5px 10px;
  font-size: 17px;
  cursor: pointer;
  font-size: 22px;
  transition: 0.3;
}

.path__nav button:hover {
  color: var(--color-sky);
  transition: 0.3;
}
.main__content {
  position: relative;
  margin: 10px auto;
  width: 98%;
  height: 100%;
  background: white;
  border-radius: 25px;
  padding: 20px;
  padding-top: 0;
  overflow-y: auto;
  overflow-x: hidden;
  scrollbar-width: thin; /* Для Firefox */
  scrollbar-color: var(--color-prime) var(--color-blue);
  padding-left: 20px; /* Проверьте, что отступы не слишком большие */
  border: 14px solid transparent; /* Для проверки */
}
.file__wrapper {
  padding: 2px;
  border-radius: 12px;
  outline: 1px solid var(--color-blue);
}

.file__wrapper:hover {
  outline: 1px solid var(--color-prime);
  background: var(--color-blue);
}

.checked {
  outline: 2px solid var(--color-sky) !important;
  background: var(--color-blue);
}

.main__content {
  box-sizing: border-box;
  /* Остальные стили */
}

.main__content::-webkit-scrollbar {
  width: 8px; /* Ширина скроллбара */
}

.main__content::-webkit-scrollbar-thumb {
  background-color: var(--color-prime); /* Цвет ползунка */
  border-radius: 10px;
}

.main__content::-webkit-scrollbar-track {
  background: var(--color-blue); /* Цвет фона трека */
}

.files__wrapper {
  width: 100%;
  display: flex;
  margin-top: 70px;
  flex-wrap: wrap;
  gap: 15px;
  justify-content: flex-start;
}

.path__nav {
  position: relative;
}

.input__container {
  position: absolute;
  max-height: 70vh;
  overflow: auto;
  top: 100%;
  right: 0;
  margin-top: 5px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  gap: 15px;
  border-radius: 10px;
  background: white;
  padding: 5px 10px;
  outline: 2px solid var(--color-sky);
  scrollbar-width: thin; /* Для Firefox */
  scrollbar-color: var(--color-prime) var(--color-blue);
}

.input__container input {
  padding: 5px;
  border-radius: 4px;
  border: 1px solid #ccc;
  width: 300px;
  outline: none;
}
.uploading-indicator {
  /* Стили для индикатора загрузки */
  text-align: center;
  margin-top: 10px;
}

.upload__status {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 300px;
  margin-top: 20px;
  margin-bottom: 10px;
}
.upload__name {
  width: 100%;
  overflow: hidden;
}
.upload__header {
  padding: 10px;
  margin-bottom: 20px;
  text-align: center;
  font-size: 20px;
  font-family: "Open Sans";
  color: var(--color-sky);
}

progress {
  width: 100%;
  margin-top: 5px;
  width: 100%;

  outline: 2px solid var(--color-blue);
}

progress::-webkit-progress-bar {
  background: var(--color-blue);
}
/* Цвет заполненной части индикатора для WebKit-браузеров */
progress::-webkit-progress-value {
  background: var(--color-prime);
}

/* Цвет заполненной части для Firefox */
progress::-moz-progress-bar {
  background: var(--color-prime);
}

.selected__files {
  margin: 0 20px;
  display: flex;
  gap: 15px;
  justify-content: center;
  align-items: center;
}

.selected__files span {
  display: block;
}
.selected__count {
  font: 16px "Open Sans";
  border: 2px solid var(--color-sky);
  padding: 2px 10px;
  border-radius: 5px;
}
.media__header-modal {
  width: 70%;
  max-width: calc(100% - 500px);
}
</style>
