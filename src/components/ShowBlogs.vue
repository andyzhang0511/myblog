<template>
  <div v-theme:colume="'narrow'" id="show-blogs">
    <h1>博客总览</h1>
    <input type="text" v-model="search" placeholder="搜索">

    <div v-for="blog in filteredBlogs" class="single-blog" :key="blog.title">
      <router-link v-bind:to="'/blog/'+blog.id">
        <h2 v-rainbow>{{blog.title | to-uppercase}}</h2>
      </router-link>
      <!-- <article>{{blog.body | snippet}}</article> -->
      <article>{{blog.content | snippet}}</article>
    </div>
  </div>
</template>

<script>
//局部引用axios
import axios from "axios";

export default {
  name: "show-blogs",
  data() {
    return {
      blogs: [],
      search: ""
    };
  },
  // 请求网络服务器里的json
  // vue-resource的写法
  // created() {
  //   this.$http.get("http://jsonplaceholder.typicode.com/posts").then(data => {
  //       console.log(data);
  //     this.blogs = data.body.slice(0, 10);
  //       console.log(this.blogs);
  //   });
  // },

  //换野狗接口
  created() {
    this.$http
      .get("https://wd6296503269ipmamo.wilddogio.com/posts.json")
      .then(data => {
        return data.json();
        console.log(data.json());
        // this.blogs = data.body.slice(0, 10); //此时的data不再是一个数组了，而是一个对象
        // console.log(this.blogs);
      })
      .then(function(data) {
        var blogsArray = [];
        for (let key in data) {
          // console.log(key);
          // console.log(data[key]);
          data[key].id = key; //这个时候每个对象身上多了一个属性叫id
          blogsArray.push(data[key]);
          // console.log(blogsArray);
          this.blogs = blogsArray;
          console.log(this.blogs);
        }
      });
  },

  //axios的写法  ？？？
  // created() {
  //   axios.get("http://jsonplaceholder.typicode.com/posts").then(data => {
  //     //   console.log(data);
  //     this.blogs = data.body.slice(0, 10);
  //     //   console.log(this.blogs);
  //   });
  // },

  //请求本地json  先跳到src,再跳到posts.json
  // created() {
  //   this.$http.get("././static/posts.json").then(data => {
  //     this.blogs = data.body.slice(0, 10);
  //   });
  // },
  computed: {
    filteredBlogs: function() {
      return this.blogs.filter(blog => {
        return blog.title.match(this.search);
      });
    }
  },
  filters: {
    // "to-uppercase": function(value) {
    //   return value.toUpperCase();
    // },
    // snippet: function(value) {
    //   return value.slice(0, 100) + "...";
    // }

    //es6写法
    toUppercase(value) {
      return value.toUpperCase();
    },
    snippet(value) {
      return value.slice(0, 100) + "...";
    }
  },
  //实现指令的全局变成本地的方法
  directives: {
    rainbow: {
      bind(el, binding, vnode) {
        el.style.color = "red";
      }
    },
    theme: {
      bind(el, bingding, vnode) {
        if (bingding.value == "wide") {
          el.style.maxWidth = "1260px";
        } else if (bingding.value == "narrow") {
          el.style.maxWidth = "560px";
        }

        if (bingding.arg == "colume") {
          el.style.background = "#6677cc";
          el.style.padding = "20px";
        }
      }
    }
  }
};
</script>

<style>
#show-blogs {
  max-width: 800px;
  margin: 0 auto;
}
.single-blog {
  padding: 20px;
  margin: 20px 0;
  box-sizing: border-box;
  background: #eee;
  border: 1px dotted #aaa;
}
#show-blogs a {
  color: #444;
  text-decoration: none;
}
input[type="text"] {
  padding: 8px;
  width: 100%;
  box-sizing: border-box;
}
</style>
