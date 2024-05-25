import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView, Dimensions } from 'react-native';

const AboutUs = () => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image source={require('../assets/pogo.png')} style={styles.logo} />
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
          Au vu des problèmes climatiques de notre époque, un changement dans les comportements habituels vis-à-vis de l’environnement doit être fait. La mission de POGO est la transformation des villes marocaines progressivement en des villes durables et intelligentes qui respectent les grands principes de la mobilité et du développement durable. Ainsi que la contribution au développement social, économique et écologique de notre pays.
        </Text>
      </View>
      <Text style={styles.title}>Ce qui nous définit ?</Text>
      <View style={styles.card2}>
        <Text style={styles.title}>Engagement </Text>
        <Text style={styles.description2}>
          Nous nous engageons à offrir la meilleure expérience de micromobilité possible dans chaque ville où nous proposons nos services.
        </Text>
      </View>
      <View style={styles.card1}>
        <Text style={styles.title}>Communauté </Text>
        <Text style={styles.description1}>
          Nous créons des offres d’emploi localement et travaillons en partenariat avec des organisations de haut calibre afin d’améliorer la vie urbaine dans les villes marocaines.
        </Text>
      </View>
      <View style={styles.card2}>
        <Text style={styles.title}>Technologie </Text>
        <Text style={styles.description2}>
          Notre volonté de conduire la micromobilité vers l'avenir nous place à la pointe du transport urbain propre et accessible.
        </Text>
      </View>
      <View style={styles.card1}>
        <Text style={styles.title}>Confiance </Text>
        <Text style={styles.description1}>
          Nous croyons fortement en la transparence et la responsabilité, et nous faisons de notre mieux afin d'offrir la meilleure expérience client chaque jour.
        </Text>
      </View>
    </ScrollView>
  );
};

const { width } = Dimensions.get('window');
const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: width * 0.05,
    paddingVertical: width * 0.05,
  },
  logo: {
    width: width * 0.3,
    height: width * 0.1,
    marginBottom: width * 0.1,
  },
  card1: {
    backgroundColor: '#0D1721',
    borderRadius: width * 0.02,
    padding: width * 0.05,
    marginVertical: width * 0.02,
    width: '100%',
  },
  card2: {
    backgroundColor: '#FFFFFF',
    borderRadius: width * 0.02,
    padding: width * 0.05,
    marginVertical: width * 0.02,
    width: '100%',
  },
  highlight: {
    fontWeight: 'bold',
    color:'#03D3B9',
 
  },
  card3: {
    backgroundColor: '#0D1721',
    borderRadius: width * 0.02,
    padding: width * 0.05,
    marginVertical: width * 0.02,
    width: '100%',
  },
  title: {
    fontSize: width * 0.05,
    fontWeight: 'bold',
    marginBottom: width * 0.02,
    color: '#03D3B9',
    textAlign: 'center',
  },
  description1: {
    fontSize: width * 0.04,
    lineHeight: width * 0.06,
    color: 'white',
  },
  description2: {
    fontSize: width * 0.04,
    lineHeight: width * 0.06,
    color: '#333333',
  },
  description3: {
    fontSize: width * 0.04,
    lineHeight: width * 0.06,
    color: 'white',
  },
  highlight: {
    fontWeight: 'bold',
    color: '#03D3B9',
  },
});

export default AboutUs;
