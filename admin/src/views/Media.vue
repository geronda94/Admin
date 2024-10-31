<script setup>
import Header from '../components/RouterHeader/Header.vue';
import axios from 'axios';
import { inject, ref } from 'vue';
import FileItem from '../components/ui/FileItem.vue';
import Modal from '../components/Modal/Modal.vue';

const lang = inject('lang');
const API = inject('API');
const files = ref([]); // Все файлы и папки, загружаемые из API
const currentPath = ref('/'); // Текущий путь
const currentFiles = ref([]); // Содержимое текущей папки
const pathArray = ref([{ name: 'root', path: '/' }]); // Для отображения пути
const showInputField = ref(false);  // Переключатель видимости поля
const folderName = ref('');         // Название новой папки

const showModal = ref(false);
const selectedFileName = ref('');
const selectedFilePath = ref('');


const createFolder = async () => {
    console.log(currentPath.value)
    if (folderName.value.trim()) {
        try {
            await axios.post(`${API}/file/create-folder`, {
                path: currentPath.value,  // путь для создания папки
                folder_name: folderName.value.trim()  // название новой папки
            }, { withCredentials: true });
            console.log('Папка успешно создана');
            fetchData()
        } catch (error) {
            console.error('Ошибка при создании папки:', error);
        } finally {
            folderName.value = '';
            showInputField.value = false;
        }
    }
};



// Функция для загрузки всех файлов и папок
const fetchData = async () => {
  try {
    const result = await axios.get(`${API}/file/all-files`, { withCredentials: true });
    if (result.status === 200) {
      files.value = result.data.files;
      updateCurrentFiles(); // Инициализация содержимого первой папки
    }
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

// Функция для обновления содержимого текущей папки
const updateCurrentFiles = () => {
  const pathParts = currentPath.value.split('/').filter(Boolean); // Разделить текущий путь на части
  let tempFiles = files.value;

  // Рекурсивно найти файлы внутри текущего пути
  for (const part of pathParts) {
    const folder = tempFiles.find(item => item.name === part && item.type === 'folder');
    if (folder) {
      tempFiles = folder.content; // Переходим внутрь папки
    } else {
      tempFiles = []; // Если путь не найден, оставить пустой
      break;
    }
  }
  currentFiles.value = tempFiles;

  // Обновление массива для отображения пути
  pathArray.value = [{ name: 'root', path: '/' }]; // Сброс начального пути
  for (let i = 0; i < pathParts.length; i++) {
    const subPath = pathParts.slice(0, i + 1).join('/');
    pathArray.value.push({ name: pathParts[i], path: `/${subPath}` });
  }
};

// Изначальная загрузка данных


// Ваши состояния

// Метод для обработки двойного клика
const handleDoubleClick = (item) => {
  if (item.type === 'file') {
    selectedFileName.value = item.name;
    selectedFilePath.value = item.fullPath;
    showModal.value = true; // Показываем модальное окно
  } else if (item.type === 'folder') {
    enterFolder(item.name); // Вход в папку
  }
}
// Переход внутрь папки
const enterFolder = (folderName) => {
  currentPath.value = `${currentPath.value.replace(/\/$/, '')}/${folderName}/`; // Добавление папки в конец текущего пути
  updateCurrentFiles();
};

// Переход назад
const goBack = () => {
  const pathParts = currentPath.value.split('/').filter(Boolean);
  if (pathParts.length > 0) {
    pathParts.pop(); // Удалить последнюю часть пути
    currentPath.value = `/${pathParts.join('/')}/`; // Преобразовать в путь с '/'
    updateCurrentFiles();
  }
};

// Переход по текущему пути
const navigateToPath = (path) => {
  currentPath.value = path;
  updateCurrentFiles();
};




fetchData();
</script>
<template>

  
    <div class="main__content">
      <!-- Отображение текущего пути и кнопка назад -->
      <div class="media__header">

          <div class="path__nav">
            <button class="back__button" @click="goBack">
                <font-awesome-icon :icon="['fas', 'arrow-left']" />
            </button>
            <span v-for="(folder, index) in pathArray" :key="folder.path">
              <a class="folder__link" @click.prevent="navigateToPath(folder.path)">
                <span v-if="folder.name == 'root'"><font-awesome-icon :icon="['fas', 'house']" /></span>
                <span v-else>{{ folder.name }}</span>
              </a>
              <span v-if="index < pathArray.length - 1">  &nbsp;/&nbsp;  </span>
            </span>
          </div>          

          
        <div class="path__nav media__functions">
            
            <span class="folder__link">
                <font-awesome-icon :icon="['far', 'file-lines']" />
            </span>
            <span class="folder__link" @click="showInputField = !showInputField">
                <font-awesome-icon :icon="['fas', 'folder-plus']" />
            </span>
            
            <div v-if="showInputField" class="input__container">
                <input 
                    v-model="folderName" 
                    @blur="createFolder" 
                    type="text" 
                    placeholder="Введите название папки"
                    @keydown.enter="createFolder"
                />
                <span @click="showInputField=false"  class="folder__link">
                    <font-awesome-icon :icon="['fas', 'check']" />
                </span>
                <span @click="showInputField=false"  class="folder__link">
                    <font-awesome-icon class="" :icon="['fas', 'xmark']" />
                </span>
                
            </div>
        </div>         


      </div>
      <!-- Отображение файлов и папок в текущей директории -->
      <div class="files__wrapper">
        <FileItem 
          v-for="item in currentFiles" 
          :key="item.fullPath"
          :type="item.type"
          :name="item.name"
          :full-path="item.fullPath"
          @dblclick="handleDoubleClick(item)"
        />
      </div>
    </div>

    <Modal v-if="showModal" :show="showModal"  @close="showModal=false" :headerTitle="selectedFileName">
      
      <template #body>
        <img :src="API+'/static/'+selectedFilePath" alt="">
        <!-- Здесь вы можете добавить содержимое файла или предпросмотр -->
      </template>
      
    </Modal>




</template>
  

<style>
.media__header{
    display: flex;
    justify-content: space-between;
    width:  calc(100% - 350px);
    margin-top: 2px;
    padding: 10px;
    position:fixed;
    background: white;
    outline: 2px solid white;
}
.media__functions{
    display: flex;
    gap: 15px;
    padding-right: 20px;
}
.folder__link{
    font-size: 22px;
    font-family: "Open Sans";
    color: var(--color-prime);
    cursor: pointer;
    text-decoration: underline;
    transition: 0.3;
}

.folder__link:hover{
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
  
.path__nav button:hover{
    color: var(--color-sky);
    transition: 0.3;
}
.main__content {
    position: relative;
    margin: 10px auto;
    width: 98%;
    height: 87vh;
    background: white;
    border-radius: 25px;
    padding: 20px;
    padding-top: 0;
    overflow-y: auto;
    overflow-x:hidden;
    scrollbar-width:thin; /* Для Firefox */
    scrollbar-color:var(--color-prime) var(--color-blue) ; 
    padding-left: 20px; /* Проверьте, что отступы не слишком большие */
    border: 14px solid transparent; /* Для проверки */
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
}

.input__container input {
    padding: 5px;
    border-radius: 4px;
    border: 1px solid #ccc;
    width: 300px;
    outline: none;
}

</style>
