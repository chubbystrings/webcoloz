<template>
    <div class="wrapper" v-click-outside="hideSearch" ref="wrapper" >
      
      <header>
        <div id="color">
            <p class="color-letters" id="colorC">C</p>
            <p class="color-letters" id="colorO">O</p>
            <p class="color-letters" id="colorL">L</p>
            <p class="color-letters" id="colorO2">O</p>
            <p class="color-letters" id="colorZ">Z</p>
        </div>
      </header>
      <div class="search-input" :class="{active: active}" >
        <transition name="fade">
          <div class="loader" v-if="loader" ><i class="fas fa-search"></i></div>
        </transition>
        <input type="text" @input="searchItem" v-model="inputValue" placeholder="Type to search.." ref="input">
        <transition
        enter-active-class="animated fadeIn"
        leave-active-class="animated fadeOut"
        >
          <div v-if="active" class="autocom-box">
            <ul>
                <li v-for="item in searchResults" 
                  :key="item.id"
                  @click="openColor(item.name)"
                  @mouseover="hover(item.name)"
                  @mouseout="removeHover(item.name)"
                  :ref="item.name"
                >
              {{ item.name }}
              </li>
            </ul>
          </div>
        </transition>
      </div>
    </div>
</template>

<script>
    export default {
        inject: ['items'], 
        data: () => ({
            searchResults: [],
            inputValue: '',
            loader: false,
        }),
         methods: {
            openColor(color) {
                this.$router.push({name: 'Color', query:{color} })
            }, 
            async fillSerchResults() {
              this.loader = true
                const server = process.env.NODE_ENV === 'production' ? process.env.VUE_APP_PROD_SERVER : process.env.VUE_APP_LOCAL_SERVER;
                // this.searchResults = this.items.filter((item) => {
                //     return item.match(this.inputValue);
                // })
          
                const response = await fetch(`${server}/search?value=${this.inputValue}`);
                if (!response.ok) {
                  console.log(response)
                  this.searchResults = []
                  this.loader = false
                } else {
                  try {
                    const responseData = await response.json();
                    this.searchResults = responseData.data ? responseData.data : [];
                    this.loader = false
                  } catch (error) {
                    console.log(error);
                    this.loader = false
                  }
                }
                
                
            },

            searchItem() {
                if(this.inputValue === '') {
                    this.searchResults = []
                } else {
                     this.fillSerchResults();
                } 
            },


            hideSearch() {
                this.searchResults = [];
            },
            
            hover(color) {
                if (color && this.inputValue) {
                  this.$refs[color].style.backgroundColor = color
                }
            },

            removeHover(color) {
                if (color && this.inputValue) {
                  this.$refs[color].style.backgroundColor = 'white'
                }
            }, 

        },
        computed: {
          active() {
            return this.searchResults.length > 0
          },

          isEmpty() {
            return this.inputValue !== '' && this.searchResults.length === 0
          }
        }, 

        mounted() {
          this.$refs.wrapper.style.display = 'block'
        }
    }
</script>

<style scoped>
@import "https://cdnjs.cloudflare.com/ajax/libs/animate.css/3.7.2/animate.min.css";
::selection{
  color: #fff;
  background: #664AFF;
}

.wrapper{
  max-width: 40rem;
  margin: 150px auto;
  display: none;
}

.wrapper .search-input{
  background: #fff;
  width: 100%;
  border-radius: 5px;
  box-shadow: 0px 1px 5px 3px rgba(0,0,0,0.12);
  overflow: auto;
  position: relative;
}

.search-input input{
  height: 55px;
  width: 100%;
  outline: none;
  border: none;
  border-radius: 5px;
  padding: 0 60px 0 20px;
  font-size: 18px;
  box-shadow: 0px 1px 5px rgba(0,0,0,0.1);
}

.search-input.active input{
  border-radius: 5px 5px 5px 5px;
}


.search-input .autocom-box{
  padding: 0;
  opacity: 0;
  pointer-events: none;
  max-height: 280px;
  overflow-y: auto;
}

.search-input.active .autocom-box{
  padding: 10px 8px;
  opacity: 1;
  pointer-events: auto;
}

.autocom-box li{
  list-style: none;
  padding: 8px 12px;
  display: none;
  width: 100%;
  cursor: default;
  border-radius: 3px;
  transition: opacity 2s ease-out;
}

li:hover {
  cursor: pointer;
}

.search-input.active .autocom-box li{
  display: block;
}


.search-input .icon{
  /* position: absolute;
  right: 10px;
  top: 0px; */
  text-align: center;
  line-height: 55px;
  font-size: 20px;
  color: #644bff;
  cursor: pointer;
}

header #color {
 text-align: center;
 font-size: 5em;
}

.color-letters {
  display: inline-block;
  padding-right: 0.5rem;
  
}

#colorC {
  transform: rotate(-40deg);
  color: green
  
}

#colorL {
  transform: rotate(-40deg);
  color: red;
  
}

#colorZ {
  color: yellow
  
}

.loader {
  border: 5px solid gray;
  border-radius: 50%;
  border-top: 5px solid #644bff;;
  width: 20px;
  height: 20px;
  -webkit-animation: spin 2s linear infinite; /* Safari */
  animation: spin 2s linear infinite;
  position: absolute;
  right: 0.5rem;
  top: 1rem;
}

.fade-enter-from, 
.fade-leave-to {
  opacity: 0
}

.fade-enter-active {
  transition: opacity 0.3s ease-out;
}
.fade-leave-active {
  transition: opacity 0.3s ease-in
}

.fade-enter-to,
.fade-leave-from {
  opacity: 1
}

/* Safari */
@-webkit-keyframes spin {
  0% { -webkit-transform: rotate(0deg); }
  100% { -webkit-transform: rotate(360deg); }
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}





</style>