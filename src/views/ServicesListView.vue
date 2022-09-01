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
              :items="categories"
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
                          v-model="service.category"
                          :items="categories"
                          label="Catégories*"
                        ></v-autocomplete>
                      </v-col>
                      <v-col>
                        <v-file-input 
                          v-model="service.image_url"
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
                    @click="addService"
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
            </v-dialog>
          </v-col>
        </v-row>  
        <!-- Serivices cards -->
        <v-row dense>
          <v-col
            v-for="service in searching"
            :key="service.id"
          >
            <v-card
              class="mx-auto"
              max-width="270"
            >
              <a :href="service.service_url" target="_blank">
                <v-img v-if="service.id==1"
                  src="@/assets/one-logo.png"
                  height="200px"
                />
                <v-img v-if="service.id==2"
                  src="@/assets/oncef.png"
                  height="200px"
                  
                />
                <v-img v-if="service.id==3"
                  src="@/assets/vignette.png"
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
                {{ service.category }} 
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
              v-show="this.services.length >= 8"
              :length="2"
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
                      v-model="service.category"
                      :items="categories"
                      label="Catégories*"
                    ></v-autocomplete>
                  </v-col>
                  <v-col>
                    <v-file-input 
                      v-model="service.image_url"
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
                @click="updateService"
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
                @click="deleteService"
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
        category: '',
        description: '',
        service_url: '',
        image_url: [],
        showDescription: false
      },
      services: [
        { 
          id: 1, title: 'Factures d\'électricité', category: 'Factures', description: 'Vos factures d électricité en ligne', 
          service_url: 'http://www.one.org.ma/FR/pages/E_Facture.asp', showDescription: false
        }
      ],
      categories: ['Taxes', 'Factures', 'Billets']
    } 
  },
  methods: {
    addService() {
      this.service.id = this.services[this.services.length-1].id + 1;
      this.services.push(this.service);
      this.hasAdded = true;
      this.resetService();
    },
    syncService(service) {
      this.service = service;
    },
    updateService() {
      const index = this.services.findIndex( ser => ser.id === this.service.id);
      this.services[index] = this.service;
      this.hasUpdated = true;
    },
    deleteService() {
      const index = this.services.findIndex( ser => ser.id === this.service.id);
      this.services.splice(index, 1);
      this.dialogDelete = false;
    },
    resetService() {
      this.service = {
        id: 0,
        title: '',
        category: '',
        description: '',
        service_url: '',
        image_url: [],
        showDescription: false
      }
    }
  },
  computed: {
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
      if (!this.filterKeyword) return this.services;
      return this.services.filter(service => {
        return service.category.toLowerCase() == this.filterKeyword.toLowerCase();
      })
    }
  },
}
</script>
