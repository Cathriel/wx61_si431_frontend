<template>
  <div class="mainContent">
    <p class="text-center text-h4 pt-8">Bienvenido Arrendatario</p>
    <p class="text-center text-h4 mb-5" v-show="currentUser!==undefined"><b>{{ currentUser.result.firstName + ' ' + currentUser.result.lastName }} </b></p>

    <v-card-text class="text-left text-h6">Inmuebles similares a los que visitaste</v-card-text>

    <v-sheet class="mx-auto" elevation="8" >
      <v-slide-group v-model="model" class="pa-2" show-arrows>
        <v-slide-item v-for="post in posts" :key="post.id"  v-slot="{ active, toggle }">
          <v-card   class="ma-3 " width="4%" @click="toggle" >
            <v-img :src="cards[post.id]" height="200px" style="float: right; margin: 0px 0px 15px 15px;">
              <v-card-actions>
                <v-btn icon color="white" @click="saveFavourite(getCurrentUserId, post.id)">
                  <v-icon>mdi-heart-outline</v-icon>
                </v-btn>
              </v-card-actions>
            </v-img>
            <v-card-title >S/ {{post.price}}</v-card-title>
            <v-card-subtitle style="font-size: 120%; " >{{post.district}}, {{post.province}}</v-card-subtitle>
            <v-card-subtitle class="my-0 text-sm-body-1" v-text="post.description"></v-card-subtitle>
            <v-card-text>
            </v-card-text>
            <v-card-actions>
              <v-btn color="deep-purple lighten-2" text @click="navigateToDetailedPostId(post.id)">
                Descripción
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-slide-item>
      </v-slide-group>
    </v-sheet>


    <v-card-text class="text-left text-h6 pt-7">Roomies que quizás quieras conocer</v-card-text>
    <v-sheet class="mx-auto" elevation="8" >
      <v-slide-group v-model="model" class="pa-2" show-arrows>
        <v-slide-item v-for="roomie in roomies2" :key="roomie.id"  v-slot="{ active, toggle }">
          <v-card   class="ma-3 " width="4%" @click="toggle" >
            <v-img :src="cards2[roomie.id-8]" height="200px" style="float: right; margin: 0px 0px 15px 15px;">
              <v-card-actions>
              </v-card-actions>
            </v-img>
            <v-card-title >{{roomie.name}} {{roomie.lastName}}</v-card-title>
            <v-card-subtitle style="font-size: 120%; " >{{roomie.department}}, {{roomie.district}}</v-card-subtitle>
            <v-card-subtitle class="my-0 text-sm-body-1" >{{roomie.description}}</v-card-subtitle>
            <v-card-text>
            </v-card-text>
            <v-card-actions>
              <v-btn color="deep-purple lighten-2">
                Contactar
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-slide-item>
      </v-slide-group>
    </v-sheet>
  </div>
</template>

<script>
import PostApiService from "@/services/posts-api.service";
import LeaseholderApiService from "@/services/leaseholder-api.service";
import FavouritePostsApi from "../services/favourite-posts-api.service";

export default {
  name: 'main-content-leaseholder',

  computed: {
    currentUser() {
      console.log(this.$store.state.auth.user);
      return this.$store.state.auth.user;
    },

    getCurrentUserId() {
      return this.currentUser.result.id;
    }
  },

  data () {
    return{
      posts:[],
      roomies2:[],

      cards: [
        { id: 1,src: 'https://q-ec.bstatic.com/images/hotel/max1024x768/193/193401125.jpg'},
        { id: 2,src: 'https://d3rny71whgunfp.cloudfront.net/eyJidWNrZXQiOiJyZXNlbS1wZSIsImtleSI6IjE2MDEzMzE2NzY4MDhfLTc2ODY1OTE0My5qcGciLCJlZGl0cyI6eyJyZXNpemUiOnsid2lkdGgiOjM1NCwiaGVpZ2h0IjoyNDAsImZpdCI6ImNvdmVyIiwid2l0aG91dEVubGFyZ2VtZW50Ijp0cnVlfX19' },
        { id: 3,src: 'https://d3rny71whgunfp.cloudfront.net/eyJidWNrZXQiOiJyZXNlbS1wZSIsImtleSI6IjE1ODk2MTExOTE3MTFfMzkzMTY5OTk2LmpwZyIsImVkaXRzIjp7InJlc2l6ZSI6eyJ3aWR0aCI6ODQwLCJoZWlnaHQiOjYzMCwiZml0IjoiY292ZXIiLCJ3aXRob3V0RW5sYXJnZW1lbnQiOnRydWV9fX0=' },
        { id: 4,src: 'https://www.requieromicasaventas.com/wp-content/uploads/2019/09/Departamentos-en-venta-en-Surco.jpg'},
        { id: 5,src: 'https://static.tokkobroker.com/pictures/109555395905328607171649885392781135955452625865933643697834565602442661197831.jpg'},
        { id: 6,src: 'https://thumbs4.properati.com/VnfJV5Z3MC5uQENtv8wm9AtIvOU=/360x270/filters:strip_icc()/https%3A%2F%2Fcdn-us.inmokey.com%2Fproperties%2F8%2F3%2Fp-664283-010221102612-885390.jpeg' },
        { id: 7,src: 'https://d2f2b72of8fmj1.cloudfront.net/1562901965801_15602006.jpeg'},
        { id: 8,src: 'https://img-us-1.trovit.com/img1pe/X1hs10l16B1Y/X1hs10l16B1Y.1_11.jpg' },
        { id: 9,src: 'https://www.bienesonline.com/peru/photos/venta-de-iluminado-y-espacioso-departamento-en-surco-DEV333171618799274-324.jpg'},
        { id: 10,src: 'https://static.tokkobroker.com/pictures/47168099978317268818807495368407560918424258965754953793026510610240177842409.jpg'},
      ],
      cards2: [
        { id: 8,src: 'https://cdn.pixabay.com/photo/2015/01/08/18/29/entrepreneur-593358_960_720.jpg'},
        { id: 9,src: 'https://image.freepik.com/foto-gratis/apuesto-joven-deportista-alegre-tiene-cuerpo-deportivo-brazos-musculosos-viste-camiseta-blanca-simulada-tiene-pelo-corto-oscuro-sonrisa-atractiva-dientes-sobre-pared-purpura-espacio-copia-blanco-lado_273609-26661.jpg' },
        { id: 10,src: 'https://ichef.bbci.co.uk/news/976/cpsprodpb/FD27/production/_101970846_aubreyblanche.jpg' },
        { id: 12,src: 'https://images.unsplash.com/photo-1605038593290-475661bfbba3?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80'},
        { id: 13,src: 'https://image.freepik.com/foto-gratis/retrato-guapo-sonriente-elegante-hipster-lumbersexual-empresario-modelo-hombre-vestido-ropa-chaqueta-jeans_158538-1736.jpg'},
        { id: 14,src: 'https://images.unsplash.com/photo-1605038593290-475661bfbba3?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80' },
        // { id: 15,src: 'https://d2f2b72of8fmj1.cloudfront.net/1562901965801_15602006.jpeg'},
        // { id: 16,src: 'https://img-us-1.trovit.com/img1pe/X1hs10l16B1Y/X1hs10l16B1Y.1_11.jpg' },
        // { id: 17,src: 'https://www.bienesonline.com/peru/photos/venta-de-iluminado-y-espacioso-departamento-en-surco-DEV333171618799274-324.jpg'},
        // { id: 18,src: 'https://static.tokkobroker.com/pictures/47168099978317268818807495368407560918424258965754953793026510610240177842409.jpg'},
      ],

      item:
          {
            color: '#f0f0f0',
            src: 'https://img10.naventcdn.com/avisos/111/00/59/58/21/54/720x532/232252076.jpg',
            title: 'Inmueble con cocina,baño compartido, con 4 cuartos',
            dateCreation: '10/06/2021'
          },
      lastests: [
        {
          title: 'Casa de 2 pisos con habitacion compartida',
          description:
              "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, " +
              "sed diam nonumy eirmod tempor invidunt ut labore et dolore " +
              "magna aliquyam erat, sed diam voluptua. At vero eos et accusam " +
              "et justo duo dolores et ea rebum. Stet clita kasd gubergren, " +
              "no sea takimata sanctus est Lorem ipsum dolor sit amet. " ,
          dateVisited: '09/06/2021',
          imgUrl: 'data:image/jpeg;base64,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'
        },
        {
          title: 'Habitacion para 4 personas',
          description:
              "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, " +
              "sed diam nonumy eirmod tempor invidunt ut labore et dolore " +
              "magna aliquyam erat, sed diam voluptua. At vero eos et accusam " +
              "et justo duo dolores et ea rebum. Stet clita kasd gubergren, " +
              "no sea takimata sanctus est Lorem ipsum dolor sit amet. " ,
          dateReviewed: '08/06/2021',
          imgUrl: 'data:image/jpeg;base64,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'

        },
        {
          title: 'Departamento con vista al mar en Costa Verde',
          description:
              "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, " +
              "sed diam nonumy eirmod tempor invidunt ut labore et dolore " +
              "magna aliquyam erat, sed diam voluptua. At vero eos et accusam " +
              "et justo duo dolores et ea rebum. Stet clita kasd gubergren, " +
              "no sea takimata sanctus est Lorem ipsum dolor sit amet. " ,
          dateReviewed: '11/06/2021',
          imgUrl: 'data:image/jpeg;base64,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'

        }
      ],
      roomies: [
        {
          name: 'Rio Roma',
          calification: 4.5,
          district: 'Miraflores',
          department: 'Lima',
          summary: 'Lorem asdsad ipsum iam nonumy eirmod tempor invidunt ' +
              'ut labore et dolore magna aliquyam erat, sed diam voluptua' +
              '. At vero eos et accusam et justo duo dolores et ea reb',
          profilePhoto: 'https://i.pinimg.com/originals/b9/69/76/b969765dd783e0989e23f2c9a634ac36.jpg'

        },
        {
          name: 'Ana Lopez',
          calification: 3.5,
          district: 'Barranco',
          department: 'Lima',
          summary: 'Lorem14221 ipsum iam nonumy eirmod tempor invidunt ' +
              'ut labore et dolore magna aliquyam erat, sed diam voluptua' +
              '. At vero eos et accusam et justo duo dolores et ea reb',
          profilePhoto: 'https://imagenes.milenio.com/5TTMebIc1A4YCdsMo3ebT6yutgk=/958x596/smart/https://www.milenio.com/uploads/media/2020/05/07/ariana-grande-interpuso-orden-alejamiento_0_21_705_437.jpg'
        },
        {
          name: 'Faarid Castro',
          calification: 4.5,
          district: 'Chorrillos',
          department: 'Lima',
          summary: 'Lorem i5235325psum iam nonumy eirmod tempor invidunt ' +
              'ut labore et dolore magna aliquyam erat, sed diam voluptua' +
              '. At vero eos et accusam et justo duo dolores et ea reb',
          profilePhoto: 'https://static4.abc.es/media/internacional/2021/04/19/pedrocastillo2-U301495321345P0G--1200x630@abc.jpg'

        },
        {
          name: 'Alfredo Palacios',
          calification: 2.5,
          district: 'San Isidro',
          department: 'Lima',
          summary: 'Lorem i12312312psum iam nonumy eirmod tempor invidunt ' +
              'ut labore et1 dolore magna aliquyam erat, sed diam voluptua' +
              '. At vero eos et accusam et justo duo dolores et ea reb',
          profilePhoto: 'https://madriddiferente.com/wp-content/uploads/2019/06/Moncloa-720x466.jpg'

        },
        {
          name: 'Bob Marley',
          calification: 4.2,
          district: 'Miraflores',
          department: 'Lima',
          summary: 'Lorem ip66767676sum iam nonumy eirmod tempor invidunt ' +
              'ut labore et dolore magna aliquyam erat, sed diam voluptua' +
              '. At vero eos et accusam et justo duo dolores et ea reb',
          profilePhoto: 'https://madriddiferente.com/wp-content/uploads/2019/06/Moncloa-720x466.jpg'

        }
      ],
      inmuebles: [
        {
          name: 'Calle Los Langostinos 458',
          district: 'San Juan de Miraflores',
          department: 'Lima',
          image:'https://img10.naventcdn.com/avisos/11/00/50/67/23/63/1200x1200/29572941.jpg',
          price:1500,
          calification:4,
          description: '今日はセックスしたい' +
              'でもあなたとだけ' +
              'どこにいますか' +
              'どこにいますか' +
              '今日はセックスしたい' +
              'でもあなたとだ'
        },
        {
          name: 'Calle Los Juanes 120',
          district: 'La Molina',
          department: 'Lima',
          image:'https://www.bienesonline.com/peru/photos/casa-salamanca-13722879290.jpg',
          price:950,
          calification:5,
          description: '今日はセックスしたい' +
              'でもあなたとだけ' +
              'どこにいますか' +
              'どこにいますか' +
              '今日はセックスしたい' +
              'でもあなたとだ'
        },
        {
          name: 'Av. El Sol 157',
          district: 'Chorrillos',
          department: 'Lima',
          description: '今日はセックスしたい' +
              'でもあなたとだけ' +
              'どこにいますか' +
              'どこにいますか' +
              '今日はセックスしたい' +
              'でもあなたとだ',

          image:'https://img10.naventcdn.com/avisos/111/00/60/46/98/52/720x532/246463138.jpg',
          price:1000,
          calification:3
        }
      ]

    }
  },
  created() {
    this.retrievePosts();
    this.retrieveLeaseholders();

    console.log(this.currentUser)

    if(this.$route.params.data != undefined)
      this.currentUser = this.$route.params.data;
      console.log(this.currentUser)

  },
  methods:{
    retrievePosts(){
      PostApiService.getAll()
          .then(response => {
            this.posts = response.data;
            this.displayPosts = response.data.map(this.getDisplayPost);
          })
          .catch((e) => {
            console.log(e);
          });
    },
    navigateToDetailedPostId(id) {
      this.$router.push({name: 'detailed-post', params: { id: id}});
    },
    retrieveLeaseholders(){
      LeaseholderApiService.getAll()
          .then(response => {
            this.roomies2 = response.data;
          })
          .catch((e) => {
            console.log(e);
          });
    },
    saveFavourite(Id, postid) {
      console.log(Id)
      FavouritePostsApi.assign(Id, postid);
    }
  },
  mounted() {
    this.retrievePosts();
    this.retrieveLeaseholders();
  }

}
</script>

<style scoped>
.buttons-container{
  padding-top: 20px;
  padding-bottom: 20px;
  text-align: center;
}

.first-information-container{
  padding-top: 25px;
  display: flex;
}

.first-information-container div p{
  padding-bottom: 0px;
  margin-bottom: 0px;
}
#similar-background{
  background-color: #FFDC4F;
  border-radius: 10px;
}

</style>
