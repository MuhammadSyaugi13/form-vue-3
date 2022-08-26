<template>
  <div class="container py-5">
    <datavue :source="products" :per-page="5" pagination="dropdown">
      <template #title>
        <h2>Products Table</h2>
      </template>
      <template #actionbar="{ checkedItems }">
        <button
          class="btn btn-danger"
          :disabled="!checkedItems.size"
          @click="deleteSelected(checkedItems)"
        >
          Delete Selected
        </button>
      </template>
      <template #head="{ sort, sortable, checkAll, isCheckedAll }">
        <tr>
          <th widht="20">
            <input type="checkbox" @change="checkAll" :checked="isCheckedAll" />
          </th>
          <th :class="sortable('name')" @click="sort('name')">Name</th>
          <th :class="sortable('category')" @click="sort('category')">
            Category
          </th>
          <th :class="sortable('price')" @click="sort('price')">Price</th>
        </tr>
      </template>
      <template #body="{ records, firstItem, isChecked, checkItem }">
        <tr v-for="(product, index) in records" :key="product.id">
          <!-- <td>{{ firstItem + index }}</td> -->
          <td>
            <input
              type="checkbox"
              :checked="isChecked(product)"
              @change="checkItem(product)"
            />
          </td>
          <td>{{ product.name }}</td>
          <td>{{ product.category }}</td>
          <td>{{ product.price }}</td>
        </tr>
      </template>
    </datavue>
  </div>
</template>

<script>
export default {
  data() {
    return {
      products: [
        {
          id: 1,
          name: "Intelligent Granite Table",
          category: "Tools",
          price: "787.00",
        },
        {
          id: 2,
          name: "Handcrafted Rubber Hat",
          category: "Games",
          price: "232.00",
        },
        {
          id: 3,
          name: "Rustic Concrete Salad",
          category: "Jewelery",
          price: "115.00",
        },
        {
          id: 4,
          name: "Gorgeous Concrete Pizza",
          category: "Garden",
          price: "250.00",
        },
        {
          id: 5,
          name: "Refined Plastic Shoes",
          category: "Health",
          price: "844.00",
        },
        {
          id: 6,
          name: "Awesome Metal Soap",
          category: "Tools",
          price: "326.00",
        },
        {
          id: 7,
          name: "Intelligent Fresh Mouse",
          category: "Home",
          price: "783.00",
        },
        {
          id: 8,
          name: "Licensed Soft Keyboard",
          category: "Music",
          price: "361.00",
        },
        {
          id: 9,
          name: "Fantastic Rubber Pants",
          category: "Garden",
          price: "786.00",
        },
        {
          id: 10,
          name: "Awesome Rubber Ball",
          category: "Automotive",
          price: "696.00",
        },
      ],
    };
  },
  methods: {
    deleteSelected(items) {
      if (confirm("Are you sure?")) {
        Array.from(items).forEach((item) => {
          const index = this.products.findIndex(
            (product) => product.id === item.id
          );
          this.products.splice(index, 1);
        });
        items.clear();
      }
    },
  },
};
</script>
