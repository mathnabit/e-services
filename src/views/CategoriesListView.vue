<template>
<div>
  <h4 class=" subtitle-2 grey--text">Catégories</h4>
  <v-container class="mt-2">
    <!-- Filter Categories -->
        <v-row>
          <v-col>
            <v-text-field
              v-model="search"
              append-icon="mdi-magnify"
              label="Chercher une catégorie"
              single-line
              filled
              rounded
              dense
            ></v-text-field>
          </v-col>
          <!-- New Category Modal -->
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
                  @click="category = {}"
                >
                  <v-icon dark class="pr-2"> mdi-plus-box-multiple </v-icon>  
                  Catégorie
                </v-btn>
              </template>
              <v-card>
                <form @submit.prevent="submitAdd">
                <v-card-title>
                  <span class="text-h5">Nouvelle Catégorie</span>
                </v-card-title>
                <v-card-text>
                  <v-container>
                    <v-row>
                      <v-col>
                        <v-text-field
                          v-model="category.title"
                          label="Libelle*"
                          required
                        ></v-text-field>
                      </v-col>
                    </v-row>
                    <v-row>
                      <v-col>
                        <v-text-field
                          v-model="category.description"
                          label="Description"
                        ></v-text-field>
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
                  <v-snackbar
                    v-model="hasAdded"
                    :timeout="2000"
                    absolute
                    top
                    center
                  >
                    Bien ajouté
                  </v-snackbar>
                </v-card-actions>
                </form>
              </v-card>
            </v-dialog>
          </v-col>
        </v-row>  
    <v-row>
      <v-col>
        <v-data-table
          :headers="headers"
          :items="searching"
          hide-default-footer
          :page.sync="page"
          :items-per-page="itemsPerPage"
          @page-count="pageCount = $event"
          class="elevation-1"
        >
          <template v-slot:item.controls="{ item }">
            <v-btn 
              class="mx-2" 
              small 
              icon
              color="success"
              @click="dialogUpdate = true; syncCategory(item)"
            >
              <v-icon dark> mdi-circle-edit-outline </v-icon>
            </v-btn>
            <v-btn 
              class="mx-2" 
              small 
              icon
              color="orange"
              @click="dialogDelete = true; syncCategory(item)"
            >
              <v-icon> mdi-delete-empty-outline </v-icon>
            </v-btn>

          </template>
        </v-data-table>
        <div class="text-center pt-2">
          <v-pagination
            v-model="page"
            :length="pageCount"
          ></v-pagination>
        </div>
      </v-col>
    </v-row>
    <!-- Update Category Modal -->
    <v-dialog
      v-model="dialogUpdate"
      max-width="500px"
    >
      <v-card>
        <form @submit.prevent="submitUpdate">
        <v-card-title>
          <span class="text-h5">Update Catégorie</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col>
                <v-text-field
                  v-model="category.title"
                  label="Libelle*"
                  required
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col>
                <v-text-field
                  v-model="category.description"
                  label="Description"
                ></v-text-field>
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
    <!-- Delete Category Modal -->
    <v-dialog
      v-model="dialogDelete"
      max-width="290"
    >
      <v-card>
        <v-card-title>
          <v-icon color="black"> mdi-delete-empty-outline </v-icon> Suppression
        </v-card-title>
        <v-card-text>
          Vous etes sur de confirmez !
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
    search: '',
    dialog: false,
    dialogUpdate: false,
    dialogDelete: false,
    hasAdded: false,
    hasUpdated: false,
    category: {
      id: 0,
      title: '',
      description: ''
    },
    // C'est mieux d'utiliser le computed getCategories directement pour le declencher auto.
    //categories: [],
    headers: [
      {
        text: 'Id',
        align: 'start',
        value: 'id',
        width: '10%'
      },
      { text: 'Libelle', value: 'title', align: 'center', width: '35' },
      { text: 'Description', value: 'description', align: 'center', width: '40%' },
      { text: 'Actions', value: 'controls', align: 'center', sortable: false, width: '15%'},
    ],
    page: 1,
    pageCount: 0,
    itemsPerPage: 10,  
  }
},
created() {
  console.log('created is here');
  this.allCategories();
  this.getCategories;
},
methods: {
  ...mapActions({
    allCategories: 'allCategories',
    addCategory: 'addCategory',
    updateCategory: 'updateCategory',
    deleteCategory: 'deleteCategory',
  }),
  submitAdd() {
    this.addCategory(this.category);
    this.category = {};
    this.hasAdded = true;
  },
  syncCategory(item) {
    console.log(item);
    this.category = item;
  },
  submitUpdate() {
    this.updateCategory(this.category);
    this.hasUpdated = true;
  },
  submitDelete() {
    this.deleteCategory(this.category.id);
    this.dialogDelete = false;
  }
},
computed: {
  getCategories() {
    return this.$store.getters.getCategories;
  },
  keywords() {
    if (!this.search) return [];
    const keywords = [];
    for (const search of this.searching) {
      keywords.push(search.keyword);
    }
    return keywords
  },
  searching() {
    if (!this.search) return this.getCategories;
    const search = this.search.toLowerCase();
    return this.getCategories.filter(category => {
      const text = category.title.toLowerCase();
      return text.indexOf(search) > -1;
    })
  },
  },
}
</script>

<style>

</style>