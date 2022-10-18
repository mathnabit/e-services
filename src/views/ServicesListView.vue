<template>
  <div>
    <h4 class=" subtitle-2 grey--text">Services</h4>
      <v-container class="mt-2">
        <!-- Filter Services -->
        <v-row>
          <v-col>
            <v-text-field
              v-model="search"
              append-icon="mdi-magnify"
              label="Chercher une service"
              single-line
              filled
              rounded
              dense
            ></v-text-field>
          </v-col>
          <v-col>
            <v-autocomplete
              v-model="filterKeyword"
              :items="getCategories"
              item-text="title"
              item-value="id"
              label="Catégories"
              filled
              rounded
              single-line
              dense
              small-chips
              deletable-chips
            ></v-autocomplete>
          </v-col>
          <!-- New Service Modal -->
          <v-col>
            <v-dialog
              v-model="dialog"
              persistent
              max-width="600px"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  color="primary"
                  dark
                  outlined
                  rounded
                  v-bind="attrs"
                  v-on="on"
                  @click="resetService"
                >
                  <v-icon dark class="pr-2"> mdi-plus-box-multiple </v-icon>  
                  Service
                </v-btn>
              </template>
              <form @submit.prevent="submitAdd" enctype="multipart/form-data">
                <v-card>
                  <v-card-title>
                    <span class="text-h5">Nouvelle Service</span>
                  </v-card-title>
                  <v-card-text>
                    <v-container>
                      <v-row>
                        <v-col>
                          <v-text-field
                            v-model="service.title"
                            label="Libelle*"
                            required
                          ></v-text-field>
                        </v-col>
                      </v-row>
                      <v-row> 
                        <v-col>
                          <v-text-field
                            v-model="service.service_url"
                            label="Lien*"
                            required
                          ></v-text-field>
                        </v-col>
                      </v-row>
                      <v-row>
                        <v-col>
                          <v-text-field
                            v-model="service.description"
                            label="Description"
                          ></v-text-field>
                        </v-col>
                      </v-row>
                      <v-row>
                        <v-col>
                          <v-autocomplete
                            v-model="service.category_id"
                            :items="getCategories"
                            item-text="title"
                            item-value="id"
                            label="Catégories*"
                          ></v-autocomplete>
                        </v-col>
                        <v-col>
                          <v-file-input 
                            type="file"
                            v-model="photo"
                            @change="onChange"
                            accept="image/*"
                            truncate-length="15"
                          ></v-file-input> 
                        </v-col>
                      </v-row>
                    </v-container>
                    <small>* Champs requis</small>
                  </v-card-text>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn
                      color="blue darken-1"
                      text
                      @click="dialog = false"
                    >
                      Fermer
                    </v-btn>
                    <v-btn
                      color="blue darken-1"
                      text
                      type="submit"
                    >
                      Ajouter
                    </v-btn>
                  </v-card-actions>
                  <v-snackbar
                    v-model="hasAdded"
                    :timeout="2000"
                    absolute
                    top
                    center
                  >
                    Bien ajouté
                  </v-snackbar>
                </v-card>
              </form>
            </v-dialog>
          </v-col>
        </v-row>  
        <!-- Serivices cards -->
        <v-row dense>
          <v-col
            v-for="service in paginateServices"
            :key="service.id"
          >
            <v-card
              class="mx-auto"
              max-width="270"
              v-if="service"
            >
              <a :href="service.service_url" target="_blank">
                <v-img
                  :src="service.image_url"
                  height="200px"
                />
              </a>
              <v-card-title> {{ service.title }} </v-card-title>
              <v-card-subtitle> 
                <v-chip
                  small
                  outlined
                  color="blue"
                >
                {{ getCategories.find(c => c.id === service.category_id) ? getCategories.find(c => c.id === service.category_id).title : '' }} 
                </v-chip>
              </v-card-subtitle>   
              <v-card-actions class="justify-center">
                <v-btn
                  class="ma-2"
                  small
                  icon
                  color="primary"
                  @click="service.showDescription = !service.showDescription"
                >
                  <v-icon dark> mdi-text-short </v-icon> 
                </v-btn>
                <v-btn
                  class="ma-2"
                  small
                  icon
                  color="success"
                  @click="dialogUpdate = true; syncService(service);"
                >
                  <v-icon dark> mdi-circle-edit-outline </v-icon> 
                </v-btn>
                <v-btn
                  class="ma-2"
                  small
                  icon
                  color="warning"
                  @click="dialogDelete = true; syncService(service);"
                >
                  <v-icon> mdi-delete-empty-outline </v-icon> 
                </v-btn>
              </v-card-actions>
              <v-expand-transition>
                <div v-show="service.showDescription">
                  <v-divider></v-divider>
                  <v-card-text>
                    {{ service.description }}
                  </v-card-text>
                </div>
              </v-expand-transition>
            </v-card>
          </v-col>
        </v-row>
        <v-spacer></v-spacer>
        <v-row>
          <v-col>
            <v-pagination
              v-model="page"
              :length="pages"
              @input="updatePage"
            ></v-pagination>
          </v-col>
        </v-row>

        <!-- Update Service Modal -->
        <v-dialog
          v-model="dialogUpdate"
          persistent
          max-width="600px"
        >              
          <v-card>
            <form @submit.prevent="submitUpdate" enctype="multipart/form-data">
            <v-card-title>
              <span class="text-h5">Update Service</span>
            </v-card-title>
            <v-card-text>
              <v-container>
                <v-row>
                  <v-col>
                    <v-text-field
                      v-model="service.title"
                      label="Libelle*"
                      required
                    ></v-text-field>
                  </v-col>
                </v-row>
                <v-row> 
                  <v-col>
                    <v-text-field
                      v-model="service.service_url"
                      label="Lien*"
                      required
                    ></v-text-field>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col>
                    <v-text-field
                      v-model="service.description"
                      label="Description"
                    ></v-text-field>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col>
                    <v-autocomplete
                      v-model="service.category_id"
                      :items="getCategories"
                      item-text="title"
                      item-value="id"
                      label="Catégories*"
                    ></v-autocomplete>
                  </v-col>
                  <v-col>
                    <v-file-input 
                      type="file"
                      v-model="photo"
                      accept="image/*"
                      truncate-length="15"
                    ></v-file-input> 
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                color="blue darken-1"
                text
                @click="dialogUpdate = false"
              >
                Fermer
              </v-btn>
              <v-btn
                color="blue darken-1"
                text
                type="submit"
              >
                Update
              </v-btn>
              <v-snackbar
                v-model="hasUpdated"
                :timeout="2000"
                absolute
                top
                center
              >
                Update effectué
              </v-snackbar>
            </v-card-actions>
            </form>
          </v-card>
        </v-dialog>
        <!-- Delete Service Modal -->
        <v-dialog
          v-model="dialogDelete"
          max-width="290"
        >
          <v-card>
            <v-card-title>
              <v-icon color="black"> mdi-delete-empty-outline </v-icon> Suppression
            </v-card-title>
            <v-card-text>
              Vous etes sur, confirmez la suppression !
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                color="green darken-1"
                text
                @click="dialogDelete = false"
              >
                Annuler
              </v-btn>
              <v-btn
                color="green darken-1"
                text
                @click="submitDelete"
              >
                OK
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-container>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
export default {
  data() {
    return {
      show: false,
      search: '',
      filterKeyword: '',
      dialog: false,
      dialogUpdate: false,
      dialogDelete: false,
      hasAdded: false,
      hasUpdated: false,
      service: {
        id: 0,
        title: '',
        category_id: 0,
        description: '',
        service_url: '',
        image_url: '',
        showDescription: false
      },
      photo: null,
      // Using getServices and getCategories instead to trigger computed reactivity
      services: [],
      // categories: []
      page: 1,
      //pages: 0,
      pageSize: 8,
      servicesCount: 0
    } 
  },
  created() {
    console.log('created is here');
    this.allServices();
    // .then(()=> {
    //   this.initPage();
    // });
    this.allCategories();
    this.updatePage(this.page);
  },
  methods: {
    ...mapActions({
      allServices: 'allServices',
      allCategories: 'allCategories',
      addService: 'addService',
      updateService: 'updateService',
      deleteService: 'deleteService',
    }),
    onChange() {
      //console.log('from onChange'+this.photo);
    },
    submitAdd() {
      let formData = new FormData();
      if (this.photo) {
        formData.append('photo', this.photo, this.photo.name);
      } 
      let payload = JSON.stringify({
        title: this.service.title,
        description: this.service.description,
        service_url: this.service.service_url,
        category_id: this.service.category_id
      });
      formData.append('service', payload);

      this.addService(formData)
      .then(()=> {
        this.updatePage(this.page);
      })
      this.hasAdded = true;
      this.resetService();
      
      
    },
    syncService(service) {
      this.service = service;
    },
    submitUpdate() {
      let formData = new FormData();
      if (this.photo) {
        formData.append('photo', this.photo, this.photo.name);
      } 
      let payload = JSON.stringify({
        id: this.service.id,
        title: this.service.title,
        description: this.service.description,
        service_url: this.service.service_url,
        category_id: this.service.category_id
      });
      formData.append('service', payload);
      this.updateService(formData);
      this.hasUpdated = true;
    },
    submitDelete() {
      this.deleteService(this.service.id);
      this.dialogDelete = false;
    },
    resetService() {
      this.service = {
        id: 0,
        title: '',
        category_id: 0,
        description: '',
        service_url: '',
        image_url: '',
        showDescription: false
      };
      this.photo = null;
    },
    // initPage() {
    //   console.log('hello from initPage 1');
		// 	this.servicesCount = this.getServices.length;
    //   console.log('hello from initPage 2'+this.servicesCount);
		// 	if (this.servicesCount < this.pageSize) {
		// 		return this.getServices;
		// 	} else {
		// 		return this.getServices.slice(0, this.pageSize);
		// 	}
		// },
    updatePage(pageIndex) {
      console.log('hello from updatePage');
      let start = (pageIndex - 1) * this.pageSize;
			let end = pageIndex * this.pageSize;
			this.page = pageIndex;
      return this.searching.slice(start, end);
    }
  },
  computed: {
    getServices() {
      console.log('je suis getServices');
      this.services = this.$store.getters.getServices;
      return this.$store.getters.getServices;
    },
    getCategories() {
      //this.categories = this.$store.getters.getCategories;
      return this.$store.getters.getCategories;
    },
    keywords() {
      if (!this.search) return []
      const keywords = [];
      for (const search of this.searching) {
        keywords.push(search.keyword);
      }
      return keywords
    },
    searching() {
      if (!this.search) return this.filtering;
      const search = this.search.toLowerCase();
      return this.filtering.filter(service => {
        const text = service.title.toLowerCase();
        return text.indexOf(search) > -1;
      });
    },
    filtering() {
      if (!this.filterKeyword) return this.getServices;
      return this.getServices.filter(service => {
        return this.getCategories.find(c => c.id === service.category_id).id == this.filterKeyword;
      })
    },
    pages() {
      console.log('hello from pages');
      this.servicesCount = this.searching.length;
			if (this.pageSize == null || this.servicesCount == null) return 0;
			return Math.ceil(this.servicesCount / this.pageSize);
		},
    paginateServices() {
      console.log('hello from paginateServices');
      return this.updatePage(this.page);
    } 
  },
}
</script>
