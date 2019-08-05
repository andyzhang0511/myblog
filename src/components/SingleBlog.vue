<template>
  <div id="single-blog">
    <h1>{{blog.title}}</h1>
    <article>{{blog.body}}</article>
    <p>作者:{{blog.author}}</p>
    <ul>
      <li v-for="category in blog.categories" :key="category">{{category}}</li>
    </ul>

    <button @click="deleteSingleBlog()">删除</button>
    <router-link :to="'/edit/'+id">编辑</router-link>
  </div>
</template>

<script>
//局部引用axios
import axios from "axios";

export default {
  name: "single-blog",
  data() {
    return {
      id: this.$route.params.id,
      blog: {}
    };
  },
  // created() {
  //   this.$http
  //     .get("http://jsonplaceholder.typicode.com/posts" + this.id)
  //     .then(function(data) {
  //       // console.log(data);
  //       this.blog = data.body;
  //     });
  // },

  //换野狗接口
  created() {
    this.$http
      .get(
        "https://wd6296503269ipmamo.wilddogio.com/posts/" + this.id + ".json"
      )
      .then(function(data) {
        console.log(data);
        return data.json();
        // this.blog = data.body;
      })
      .then(data => {
        this.blog = data;
      });
  },

  // 删除博客，firebase用不了
  methods: {
    deleteSingleBlog() {
      this.$http
        .delete(
          "https://wd6296503269ipmamo.wilddogio.com/posts/" + this.id + ".json"
        )
        .then(response => {
          this.$router.push({ path: "/" });
        });
    }
  }
};
</script>

<style scope>
#single-blog {
  max-width: 960px;
  margin: 0 auto;
  padding: 20px;
  background: #eee;
  border: 1px dotted #aaa;
}
</style>