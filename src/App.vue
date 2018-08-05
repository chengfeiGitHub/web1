<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  // name: 'App',
  // data () {
  //   return {
  //     itemList: []
  //   }
  // },
  // mounted () {
  //   this.getAjax()
  // },
  // methods: {
  //   getAjax: function () {
  //     this.$axios.get('http://localhost:8200/getInfo')
  //       .then(function (response) {
  //         console.log(response.data)
  //       })
  //       .catch(function (error) {
  //         console.log(error)
  //       })
  //   }
  // }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
