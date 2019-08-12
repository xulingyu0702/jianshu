<template>
<div>
  <HomeHeader></HomeHeader>
 <div>home</div>
<router-link to="/list">列表页</router-link>
</div>
</template>
<script>
import HomeHeader from './components/Header'
export default {
  name: 'Home',
  components:{
    HomeHeader
  }
}
</script>
<style>

</style>