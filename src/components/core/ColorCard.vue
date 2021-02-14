<template>
  <div>
    <div class='profile-card'>
        <div class='profile-image'>
            <div class='profile-image__img' :style="{backgroundColor: name}" ></div>
        </div>
        <div class='profile-info'> 
            <span> {{ name }} </span>
            <h3> {{ rgb }} </h3>
            <p> {{ hex }} </p>
        </div>
    </div>
  </div>
</template>
<script>
export default {
    props: ['hex', 'name', 'rgb'],

}
</script>
<style scoped>
.profile-card {
    width: 100%;
    max-width: 700px;
    margin: 0 auto;
    padding: 30px;
    box-sizing: border-box;
    border-radius: 20px;
    background-color: #fff;
    overflow: hidden;
    position: relative;
    min-height: 150px;
  }

  .profile-card .profile-image__img {
    width: 5rem;
    height: 5rem;
    border-radius: 50%;
    position: absolute;
    top: 30px;
    left: 0.5rem;
    margin-right: 1rem;
  }


  .profile-card .profile-image__border {
    width: calc(10% + 20px);
    height: auto;
    position: absolute;
    top: 20px;
    left: 20px;
  }

  .profile-info {
    width: 85%;
    float: right;
    padding-left: 15px;
    box-sizing: border-box;
  }

  .profile-info span {
    text-transform: uppercase;
    color: #666;
    letter-spacing: 3px;
  }

  .profile-info h3 { 
    margin: 10px 0;
    font-weight: 700;
    font-size: 1.5em;
    color: #222;
  }

  .profile-info p {
    line-height: 140%;
    color: #666;
  }
</style>