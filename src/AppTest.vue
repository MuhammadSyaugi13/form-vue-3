<template>
  <div class="container py-5">
    <h1 class="border-bottom mb-4">Form Product</h1>
    <div class="row">
      <div class="col-md-8">
        <!-- name -->
        <div class="form-group">
          <base-input type="text" v-model.trim="product.name" label="Name"></base-input>
        </div>
        <!-- <div class="form-group">
          <label>Name</label>
          <input type="text" class="form-control" :value="product.name" @input="product.name = $event.target.value"/>
         </div> -->
        <!-- last name -->

        <!-- price -->
        <div class="form-group">
          <base-input type="number" v-model.number="product.price" label="Price"></base-input>
          <!-- <label>Price</label>
          <input type="number" class="form-control" :value="product.price" @input="product.price = $event.target.value"/> -->
        </div>
        <!-- last price -->
        <div class="form-group">
          <label>Description</label>
          <textarea class="form-control" rows="5" :value="product.description" @input="product.description = $event.target.value"></textarea>
        </div>
        <!-- image -->
        <div class="form-group">
          <base-input type="text" v-model="product.image" label="Image"></base-input>
          <!-- <label>Image</label>
          <input type="text" class="form-control" /> -->
        </div>
        <!-- last image -->

        <!-- select category -->
        <base-select label="Category"
                     v-model="product.categoryId"
                     :options="categories"
                     placeholder="Select a Category"
        ></base-select>
        <!-- <div class="form-group">
          <label>Category</label>
          <select class="form-control" 
                  :value="product.categoryId"
                  @change="product.categoryId = $event.target.value"
          >
            <option value="1">Category 1</option>
            <option value="2">Category 2</option>
            <option value="3">Category 3</option>
          </select>
        </div> -->
        <!-- lastselect category -->

        <div class="form-group">
          <label>Vendor</label>
          <select class="form-control">
            <option value="1">Vendor 1</option>
            <option value="2">Vendor 2</option>
            <option value="3">Vendor 3</option>
          </select>
        </div>
        <div class="form-group">
          <label>Colors</label>
          <div>
            <div class="form-check form-check-inline">
              <input class="form-check-input" type="checkbox" value="1" />
              <label class="form-check-label">Red</label>
            </div>
            <div class="form-check form-check-inline">
              <input class="form-check-input" type="checkbox" value="2" />
              <label class="form-check-label">Green</label>
            </div>
            <div class="form-check form-check-inline">
              <input class="form-check-input" type="checkbox" value="3" />
              <label class="form-check-label">Blue</label>
            </div>
          </div>
        </div>
        <div class="form-group">
          <label>Publish</label>
          <div>
            <div class="form-check form-check-inline">
              <input class="form-check-input" checked type="radio" value="1" />
              <label class="form-check-label">Yes</label>
            </div>
            <div class="form-check form-check-inline">
              <input class="form-check-input" type="radio" value="0" />
              <label class="form-check-label">No</label>
            </div>
          </div>
        </div>
        <hr />
        <div class="form-group">
          <button class="btn btn-lg btn-primary">Save</button>
        </div>
      </div>
      <div class="col-md-4">
        <pre>
          {{ product }}
        </pre>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      product: {
        name: 'Produk 1',
        price: 10000,
        description:'keterangan produk 1',
        image: "",
        categoryId: ""
      },
      categories: [
        { value: 1, text: "Category 1" },
        { value: 2, text: "Category 2" },
        { value: 3, text: "Category 3" },
        { value: 4, text: "Category 4" },
      ],
      vendors: [
        { value: 1, text: "Vendor 1" },
        { value: 2, text: "Vendor 2" },
        { value: 3, text: "Vendor 3" },
        { value: 4, text: "Vendor 4" },
      ],
      colors: [
        { value: 1, text: "Red" },
        { value: 2, text: "Green" },
        { value: 3, text: "Blue" },
      ],
    };
  },
};
</script>
