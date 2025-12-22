<script setup>
const { data } = await useFetch("https://jsonplaceholder.typicode.com/todos");
const todos = data.value;

const handleFetch = async () => {
  // const { data } = await useAsyncData(
  //   "https://jsonplaceholder.typicode.com/todos/1"
  // );
  // console.log({ data });
  console.log("clicked");
};
</script>

<template>
  <h1>Test</h1>
  <button
    @click="handleFetch"
    class="bg-neutral-800 text-white px-3 py-1 rounded-full"
  >
    Fetch
  </button>
  <hr />
  <div
    v-for="{ id, userId, title, isCompleted } in todos"
    :key="id"
    class="pb-3"
  >
    <h3 class="text-xl pb-1.5">{{ title }}</h3>
    <ul>
      <li>Id: {{ id }}</li>
      <li>user id: {{ userId }}</li>
      <li>Is completed: {{ isCompleted }}</li>
    </ul>
  </div>
</template>
