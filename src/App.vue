<template>
  <div class="app">

    <Navi/>
    <router-view/>

    <div v-if="show_chat_template" class="chat_template">
      <ChatTemplate/>
    </div>

    <div v-if="show_new_message_pop_up" class="pop_up_new_message">
      <button v-on:click="on_pop_up_x_pressed" class="exit_pop_up">X</button>
      <PopUp_NewMessage v-on:click="show_chat_template = !show_chat_template"/>
    </div>

  </div>
</template>

<script>

import Navi from "./components/Navi";
import PopUp_NewMessage from "./components/PopUp_NewMessage";
import ChatTemplate from "./components/Contact_page_components/ChatTemplate";

import {mapGetters,mapState} from 'vuex';

export default {
  name: 'App',

  components: {
    Navi,
    PopUp_NewMessage,
    ChatTemplate
  },

  data(){
    return{
      chat_session: localStorage.getItem('chat_session'),
      show_new_message_pop_up: false,
      show_chat_template:false,
    }
  },

  computed:{
    ...mapState(['new_message_active','contact_chat_channel']),
    ...mapGetters(['exitChat']),
  },

  watch:{
    exitChat(){
      this.on_pop_up_x_pressed();
    },

    new_message_active(){
      this.show_new_message_pop_up = true;
    }
  },

  created() {
    if (sessionStorage.getItem('jwt_token') &&
        sessionStorage.getItem('user_name') &&
        sessionStorage.getItem('chat_session')&&
        this.contact_chat_channel === ''){
        this.$store.dispatch('set_channel');
    }
  },

  methods:{
    on_pop_up_x_pressed(){
      this.show_new_message_pop_up = false;
      this.show_chat_template = false;
    },
  },

}
</script>

<style lang="scss" scoped>
@import "./assets/styles/_app.sass";

.app{
  position: relative;

  .pop_up_new_message{
    width: 70px;
    height: 70px;
    position: -webkit-sticky;
    position: sticky;
    bottom: 50px;
    margin-left: auto;
    margin-right: 3rem;
    animation-duration: 0.5s;
    animation-name: slideout;


    .exit_pop_up{
      position: absolute;
      right: -0.5rem;
      top: -0.5rem;
      background-color: white;
      border-radius: 100px;
      margin-left: auto;
    }
  }
  .chat_template{
    background-color: #dddddd;
    width: 300px;
    height: 400px;
    position: sticky;
    bottom: 150px;
    margin-left: auto;
    margin-right: 3rem;
  }

}

@keyframes slideout {
  from {
    bottom: 0px;
    margin-left: auto;
    margin-right: 0.5rem;
  }
  to {
    bottom: 50px;
    margin-left: auto;
    margin-right: 3rem;
  }

}


</style>
