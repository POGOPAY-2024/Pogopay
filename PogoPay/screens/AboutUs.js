import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';

const AboutUs = () => {
  return (
    <ScrollView>
    <View style={styles.container}>
      <Image
        source={require('../assets/pogo.png')} // Replace with app logo image
        style={styles.logo}
      />
      <View style={styles.card1}>
      <Text style={styles.title}>Title</Text>

      <Text style={styles.description1}>
        POGO est une start-up qui a été lancée en 2021 par une équipe de jeunes entrepreneurs marocains, ambitieux, souhaitant métamorphoser et digitaliser la mobilité urbaine au Maroc. Notre ambition est de simplifier la mobilité urbaine et de rapprocher la mobilité électrique au plus grand nombre de citoyens.
      </Text>
    </View>
    <View style={styles.card2}>
      <Text style={styles.title}>D’où vient l’idée POGO ?</Text>
      <Text style={styles.description2}>
        <Text style={styles.highlight}>POGO</Text> <Text>(</Text><Text style={styles.highlight}>P</Text>eople <Text style={styles.highlight}>O</Text>n the <Text style={styles.highlight}>GO</Text>) signifie les gens extrêmement actifs, en constant mouvement, dans les deux sens de l’expression : les gens qui se déplacent, et les gens qui cherchent constamment à se développer et s’améliorer. Puisque nous estimons que toute communauté mérite une mobilité intelligente et à la portée de tous, nous mettons à la disposition de la communauté <Text style={styles.highlight}>POGO</Text> des véhicules électriques (scooters et trottinettes) en libre-service à la location courte durée. Nous visons à réduire la dépendance sur les voitures personnelles pour les transportations à courte distance afin de limiter les émissions de CO2 et de gaz à effet de serre.
      </Text>
    </View>
    <View style={styles.card3}>
      <Text style={styles.title}>Notre mission ?</Text>
      <Text style={styles.description3}>
<Text>Au vu des problèmes climatiques de notre époque, un changement dans les comportements habituels vis-à-vis de l’environnement doit être fait. La mission de POGO est la transformation des villes marocaines progressivement en des villes durables et intelligentes qui respectent les grands principes de la mobilité et du développement durable. Ainsi que la contribution au développement social, économique et écologique de notre pays.</Text>      </Text>
    </View>
    <Text style={styles.title}>Ce qui nous définit ?</Text>
    <View style={styles.card2}>
      <Text style={styles.title}>Engagement </Text>

      <Text style={styles.description2}>
      Nous nous engageons à offrir la meilleure expérience de micromobilité possible dans chaque ville où nous proposons nos services.      </Text>
    </View>
    <View style={styles.card1}>
      <Text style={styles.title}>Communauté </Text>

      <Text style={styles.description1}>
      Nous créons des offres d’emploi localement et travaillons en partenariat avec des organisations de haut calibre afin d’améliorer la vie urbaine dans les villes marocaines.     </Text>
    </View>
    <View style={styles.card2}>
      <Text style={styles.title}>Technologie </Text>

      <Text style={styles.description2}>
      Notre volonté de conduire la micromobilité vers l'avenir nous place à la pointe du transport urbain propre et accessible.    </Text>
    </View>
    <View style={styles.card1}>
      <Text style={styles.title}>Confiance </Text>

      <Text style={styles.description1}>
      Nous croyons fortement en la transparence et la responsabilité, et nous faisons de notre mieux afin d'offrir la meilleure expérience client chaque jour.     </Text>
    </View>


    
    </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  logo: {
    width: 100,
    height: 30,
    marginBottom: 30,
    right:140,
    top:10
  },

  learnMoreButton: {
    backgroundColor: '#03D3B9', // Example color, use brand color
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  learnMoreButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  card1: {
    backgroundColor: '#0D1721',
    borderRadius: 10,
    padding: 20,
    margin: 10,
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  description1: {
    fontSize: 16,
    lineHeight: 24,
    textAlign: 'justify',
    color: 'white',
  },
  card2: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 20,
    margin: 10,
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color:'#03D3B9',
    textAlign:'center'

  },
  description2: {
    fontSize: 16,
    lineHeight: 24,
    color: '#333333',
  },
  highlight: {
    fontWeight: 'bold',
    color:'#03D3B9',
 
  },
  card3: {
    backgroundColor: '#0D1721',
    borderRadius: 10,
    padding: 20,
    margin: 10,
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },

  description3: {
    fontSize: 16,
    lineHeight: 24,
    color: 'white',
  },
});

export default AboutUs;
