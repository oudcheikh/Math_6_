import React, { useState, useEffect } from 'react';
import QCMComponent from './RandomQuiz';
import { fetchResultsFromStore } from '../../SyncFirebase'


function ExamenQCM() {
  const [qcmList, setQcmList] = useState([]);

  const chapter = "Mathématiques";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchResultsFromStore("prepa-français", "PRPAMA006", "PRPAMA006");
        setQcmList(data);
      } catch (error) {
        console.error('Erreur lors de la récupération des données :', error);
      }
    };

    fetchData();

    // Clean-up function
    return () => {
      // Perform any cleanup if necessary
    };
  }, []); // Exécutez l'effet à chaque fois que le chapitre change
  const minNbCorrectAnswer = Math.min(...qcmList.map(qcm => qcm.nbCorrectAnswer));
  // Remarque: Vous pouvez ajuster le critère de tri selon vos besoins
    const filteredAndSortedQCMs = qcmList
    .filter(qcm => qcm.nbCorrectAnswer === minNbCorrectAnswer)
    .sort((a, b) => a.nbCorrectAnswer - b.nbCorrectAnswer); // Ou tout autre critère de tri

    console.log("filteredAndSortedQCMs : ", filteredAndSortedQCMs);

    const te = [
      {
          "id": "Q22",
          "correctAnswer": "300 MRU",
          "difficulty": "Facile",
          "answers": ["250 MRU", "300 MRU", "350 MRU"],
          "matiere": "EconomieBasique",
          "division": "educationFinanciere",
          "question": "Fatou achète des perles ✨ pour 700 MRU et dépense 100 MRU pour les assembler en bijoux 💍. Elle vend les bijoux à 1100 MRU 💰. Quel est son bénéfice ?",
          "explanation": "Bénéfice = Prix de vente - Prix de revient.\nCalcul:\nBénéfice = 1100 MRU - (700 MRU + 100 MRU)\n= 1100 MRU - 800 MRU\n= 300 MRU."
        },
      {
          "id": "Q23",
          "correctAnswer": "200 MRU",
          "difficulty": "Facile",
          "answers": ["150 MRU", "200 MRU", "250 MRU"],
          "matiere": "EconomieBasique",
          "division": "educationFinanciere",
          "question": "Ibrahim vend un vélo 🚲 pour 800 MRU qu'il avait acheté pour 1000 MRU. Quelle est sa perte ?",
          "explanation": "Perte = Prix de revient - Prix de vente.\nCalcul:\nPerte = 1000 MRU - 800 MRU\n= 200 MRU."
        },
      {
          "id": "Q24",
          "correctAnswer": "400 MRU",
          "difficulty": "Facile",
          "answers": ["350 MRU", "400 MRU", "450 MRU"],
          "matiere": "EconomieBasique",
          "division": "educationFinanciere",
          "question": "Saliou peint des tableaux 🎨 et les vend pour 1200 MRU après avoir dépensé 800 MRU en matériaux. Quel est son bénéfice ?",
          "explanation": " Bénéfice = Prix de vente - Prix de revient. \nCalcul:\n Bénéfice = 1200 MRU - 800 MRU\n = 400 MRU."
      },
      {
          "id": "Q25",
          "correctAnswer": "150 MRU",
          "difficulty": "Facile",
          "answers": ["100 MRU", "150 MRU", "200 MRU"],
          "matiere": "EconomieBasique",
          "division": "educationFinanciere",
          "question": "Lamine achète un ordinateur 💻 pour 1150 MRU et le vend à 1000 MRU. Quelle est sa perte ?",
          "explanation": " Perte = Prix de revient - Prix de vente. \nCalcul:\n  Perte = 1150 MRU - 1000 MRU\n = 150 MRU."
      },
      {
          "id": "Q26",
          "correctAnswer": "250 MRU",
          "difficulty": "Facile",
          "answers": ["200 MRU", "250 MRU", "300 MRU"],
          "matiere": "EconomieBasique",
          "division": "educationFinanciere",
          "question": "Khady vend des gâteaux 🍰 qu'elle a faits pour 750 MRU, ayant dépensé 500 MRU en ingrédients. Quel est son bénéfice ?",
          "explanation": " Bénéfice = Prix de vente - Prix de revient. \nCalcul:\n  Bénéfice = 750 MRU - 500 MRU\n = 250 MRU."
      }
  ,
      {
          "id": "Q1",
          "question": "Fatimata a 4 pommes 🍎. Elle en achète 5 de plus. Combien de pommes a-t-elle maintenant ?",
          "answers": ["7 pommes", "9 pommes", "8 pommes"],
          "correctAnswer": "9 pommes",
          "explanation": "On additionne les pommes qu'elle avait avec celles qu'elle a achetées.\n 4🍎 + 5🍎 = 9🍎.",
          "difficulty": "Facile",
          "matiere": "Mathematiques",
          "division": "CalculSimple"
      },
      {
          "id": "Q2",
          "question": "Amadou a 10 bonbons 🍬. Il en donne 2 à son ami. Combien de bonbons lui reste-t-il ?",
          "answers": ["8 bonbons", "7 bonbons", "9 bonbons"],
          "correctAnswer": "8 bonbons",
          "explanation": "On soustrait les bonbons donnés du total qu'Amadou avait.\n 10 🍬 - 2 🍬 = 8 🍬.",
          "difficulty": "Facile",
          "matiere": "Mathematiques",
          "division": "CalculSimple"
      },
      {
          "id": "Q3",
          "question": "Aïcha lit 2 pages 📖 de son livre 📚 chaque soir. Si elle lit pendant 3 soirs, combien de pages aura-t-elle lues ?",
          "answers": ["5 pages", "6 pages", "7 pages"],
          "correctAnswer": "6 pages",
          "explanation": "On multiplie le nombre de pages lues chaque soir par le nombre de soirs.\n 2📖 x 3 = 6📖.",
          "difficulty": "Facile",
          "matiere": "Mathematiques",
          "division": "CalculSimple"
      },
      {
          "id": "Q4",
          "question": "Mohamed a un aquarium avec 4 poissons 🐟. Si 2 de plus naissent, combien de poissons y aura-t-il au total ?",
          "answers": ["5 poissons", "6 poissons", "7 poissons"],
          "correctAnswer": "6 poissons",
          "explanation": "On ajoute les poissons qui sont nés au total qu'il avait déjà.\n 4🐟 + 2🐟 = 6🐟.",
          "difficulty": "Facile",
          "matiere": "SciencesNaturelles",
          "division": "VieAquatic"
      }
  ,
      {
          "id": "Q5",
          "question": "Laila a planté 2 arbres 🌳 et son frère en a planté 3 de plus. Combien d'arbres ont-ils planté en tout ?",
          "answers": ["4 arbres", "5 arbres", "6 arbres"],
          "correctAnswer": "5 arbres",
          "explanation": "On additionne les arbres plantés par Laila et ceux plantés par son frère.\n 2🌳 + 3🌳 = 5🌳.",
          "difficulty": "Facile",
          "matiere": "Environnement",
          "division": "NatureEtDecouverte"
      },
      {
          "id": "Q6",
          "question": "Dans la classe, il y a 4 filles 👧 et 5 garçons 👦. Combien d'élèves y a-t-il au total ?",
          "answers": ["8 élèves", "9 élèves", "10 élèves"],
          "correctAnswer": "9 élèves",
          "explanation": "On additionne le nombre de filles et de garçons.\n 4 👧 + 5 👦 = 9 élèves.",
          "difficulty": "Facile",
          "matiere": "Mathematiques",
          "division": "CalculSimple"
      },
      {
          "id": "Q7",
          "question": "Si un sac de riz 🍚 coûte 200 MRU et que Fatim a 1000 MRU, combien de sacs peut-elle acheter ?",
          "answers": ["4 sacs", "5 sacs", "6 sacs"],
          "correctAnswer": "5 sacs",
          "explanation": "On divise l'argent que Fatim a par le coût d'un sac.\n  1000 / 200 = 5 sacs.",
          "difficulty": "Facile",
          "matiere": "EconomieBasique",
          "division": "educationFinanciere"
      },
      {
          "id": "Q8",
          "question": "Oumar a 3 crayons. Il en perd 1. Combien lui reste-t-il de crayons ?",
          "answers": ["1 crayon", "2 crayons", "3 crayons"],
          "correctAnswer": "2 crayons",
          "explanation": "On soustrait le crayon perdu du total.\n 3 - 1 = 2 crayons.",
          "difficulty": "Facile",
          "matiere": "Mathematiques",
          "division": "CalculSimple"
      },
      {
          "id": "Q9",
          "question": "Il y a 6 œufs 🥚 dans une boîte. Si on en ajoute 4, combien y a-t-il d'œufs dans la boîte maintenant ?",
          "answers": ["9 œufs", "10 œufs", "11 œufs"],
          "correctAnswer": "10 œufs",
          "explanation": "On additionne les œufs qui étaient déjà dans la boîte avec ceux ajoutés.\n 6 🥚 + 4🥚 = 10 🥚.",
          "difficulty": "Facile",
          "matiere": "Mathematiques",
          "division": "CalculSimple"
      },
      {
          "id": "Q10",
          "question": "Mamadou achète des stylos à 100 MRU et dépense 20 MRU pour les transporter.\n Il les vend à 150 MRU.\n A-t-il fait un bénéfice ou une perte ?",
          "answers": ["Bénéfice", "Perte", "Ni l'un ni l'autre"],
          "correctAnswer": "Bénéfice",
          "explanation": "Prix de revient = 100 MRU (prix d'achat) + 20 MRU.\n (frais) = 120 MRU.\n Prix de vente = 150 MRU.\n Bénéfice = Prix de vente - Prix de revient\n = 150 MRU - 120 MRU\n = 30 MRU.",
          "difficulty": "Facile",
          "matiere": "EconomieBasique",
          "division": "educationFinanciere"
      },
      {
          "id": "Q11",
          "question": "Fatou achète des livres pour 200 MRU et dépense 50 MRU pour les livrer. Elle les vend à 230 MRU. A-t-elle fait un bénéfice ou une perte ?",
          "answers": ["Bénéfice", "Perte", "Ni l'un ni l'autre"],
          "correctAnswer": "Perte",
          "explanation": "Prix de revient = 200 MRU (prix d'achat) + 50 MRU (frais)\n = 250 MRU.\n Prix de vente = 230 MRU.\n Perte = Prix de revient - Prix de vente\n = 250 MRU - 230 MRU\n = 20 MRU.",
          "difficulty": "Facile",
          "matiere": "EconomieBasique",
          "division": "educationFinanciere"
      },
      {
          "id": "Q12",
          "question": "Aissatou achète des perles à 300 MRU et dépense 30 MRU pour les enfilées. Elle les vend à 400 MRU. Combien a-t-elle gagné ?",
          "answers": ["70 MRU", "100 MRU", "130 MRU"],
          "correctAnswer": "70 MRU",
          "explanation": "Prix de revient = 300 MRU (prix d'achat) + 30 MRU (frais)\n = 330 MRU.\n Prix de vente = 400 MRU.\n Bénéfice = Prix de vente - Prix de revient\n = 400 MRU - 330 MRU\n = 70 MRU.",
          "difficulty": "Facile",
          "matiere": "EconomieBasique",
          "division": "educationFinanciere"
      },
      {
          "id": "Q13",
          "question": "Baba vend des chapeaux. Il achète chaque chapeau à 150 MRU et dépense 10 MRU pour chaque chapeau en décoration. S'il les vend à 200 MRU, quel est son bénéfice par chapeau ?",
          "answers": ["30 MRU", "40 MRU", "50 MRU"],
          "correctAnswer": "40 MRU",
          "explanation": "Prix de revient = 150 MRU (prix d'achat) + 10 MRU (frais)\n = 160 MRU. \nPrix de vente = 200 MRU. \nBénéfice par chapeau = Prix de vente - Prix de revient \n = 200 MRU - 160 MRU =\n 40 MRU.",
          "difficulty": "Facile",
          "matiere": "EconomieBasique",
          "division": "educationFinanciere"
      },
      {
          "id": "Q14",
          "question": "Ali vend des sucettes 🍭. Il achète chaque sucette à 50 MRU et dépense 20 MRU pour les emballer 🎁. S'il vend chaque sucette à 100 MRU, quel est son bénéfice par sucette ?",
          "answers": ["20 MRU", "30 MRU", "40 MRU"],
          "correctAnswer": "30 MRU",
          "explanation": "Prix de revient = 50 MRU (prix d'achat) + 20 MRU (frais) = 70 MRU.\n Prix de vente = 100 MRU.\n Bénéfice par sucette = Prix de vente - Prix de revient\n = 100 MRU - 70 MRU\n = 30 MRU.",
          "difficulty": "Facile",
          "matiere": "EconomieBasique",
          "division": "educationFinanciere"
      },
      {
          "id": "Q15",
          "question": "Khadija fait des bracelets 💍. Elle dépense 200 MRU pour les matériaux et 50 MRU pour les perles. Si elle vend ses bracelets à 300 MRU, fait-elle un bénéfice ou une perte ?",
          "answers": ["Bénéfice", "Perte", "Ni l'un ni l'autre"],
          "correctAnswer": "Bénéfice",
          "explanation": "Prix de revient = 200 MRU (matériaux) + 50 MRU (perles)\n = 250 MRU.\n Prix de vente = 300 MRU.\n Bénéfice = Prix de vente - Prix de revient\n = 300 MRU - 250 MRU\n = 50 MRU.",
          "difficulty": "Facile",
          "matiere": "EconomieBasique",
          "division": "educationFinanciere"
      },
      {
          "id": "Q16",
          "question": "Oumar achète des livres 📚 à 400 MRU et dépense 100 MRU pour les livrer 🚚 à sa boutique. Il vend tous les livres à 450 MRU. A-t-il fait un bénéfice ou une perte ?",
          "answers": ["Bénéfice", "Perte", "Ni l'un ni l'autre"],
          "correctAnswer": "Perte",
          "explanation": "Prix de revient = 400 MRU (prix d'achat) + 100 MRU (frais de livraison)\n = 500 MRU.\n Prix de vente = 450 MRU.\n Perte = Prix de revient - Prix de vente\n = 500 MRU - 450 MRU \n= 50 MRU.",
          "difficulty": "Facile",
          "matiere": "EconomieBasique",
          "division": "educationFinanciere"
      },
      {
          "id": "Q17",
          "question": "Aminata vend des gâteaux 🍰. Elle dépense 300 MRU pour la farine et 200 MRU pour les autres ingrédients. Si elle vend ses gâteaux pour un total de 600 MRU, quel est son bénéfice ?",
          "answers": ["50 MRU", "100 MRU", "150 MRU"],
          "correctAnswer": "100 MRU",
          "explanation": "Prix de revient = 300 MRU (farine) + 200 MRU (autres ingrédients) = 500 MRU.\n Prix de vente = 600 MRU.\n Bénéfice = Prix de vente - Prix de revient\n = 600 MRU - 500 MRU\n = 100 MRU.",
          "difficulty": "Facile",
          "matiere": "EconomieBasique",
          "division": "educationFinanciere"
      },
      {
          "id": "Q18",
          "question": "Sofia vend des cookies 🍪. Elle fait 10 cookies avec 50 MRU de farine et 20 MRU de chocolat. Si elle vend tout à 100 MRU, a-t-elle fait un bénéfice ou une perte ?",
          "answers": ["Bénéfice", "Perte", "Ni l'un ni l'autre"],
          "correctAnswer": "Bénéfice",
          "explanation": "Prix de revient = 50 MRU (farine) + 20 MRU (chocolat) = 70 MRU.\n Prix de vente = 100 MRU.\n Bénéfice = Prix de vente - Prix de revient\n = 100 MRU - 70 MRU\n = 30 MRU.",
          "difficulty": "Facile",
          "matiere": "EconomieBasique",
          "division": "educationFinanciere"
      },
      {
          "id": "Q19",
          "question": "Bilal a un stand de jus d'orange 🍊. Il achète les oranges pour 40 MRU et dépense 10 MRU pour le sucre. Il vend son jus pour 70 MRU. Quel est son bénéfice ?",
          "answers": ["10 MRU", "20 MRU", "30 MRU"],
          "correctAnswer": "20 MRU",
          "explanation": "Prix de revient = 40 MRU (oranges) + 10 MRU (sucre) = 50 MRU.\n Prix de vente = 70 MRU.\n Bénéfice = Prix de vente - Prix de revient\n = 70 MRU - 50 MRU\n = 20 MRU.",
          "difficulty": "Facile",
          "matiere": "EconomieBasique",
          "division": "educationFinanciere"
      },
      {
          "id": "Q20",
          "question": "Lina fabrique des colliers 📿. Elle dépense 30 MRU pour les perles et 20 MRU pour le fil. Elle vend un collier pour 70 MRU. A-t-elle fait un bénéfice ou une perte ?",
          "answers": ["Bénéfice", "Perte", "Ni l'un ni l'autre"],
          "correctAnswer": "Bénéfice",
          "explanation": "Prix de revient = 30 MRU (perles) + 20 MRU (fil) = 50 MRU.\n Prix de vente = 70 MRU.\n Bénéfice = Prix de vente - Prix de revient\n = 70 MRU - 50 MRU\n = 20 MRU.",
          "difficulty": "Facile",
          "matiere": "EconomieBasique",
          "division": "educationFinanciere"
      },
      {
          "id": "Q21",
          "question": "Ahmed vend des plantes 🌱. Il achète des pots pour 60 MRU et des graines pour 40 MRU. S'il vend les plantes pour 120 MRU, quel est son bénéfice ?",
          "answers": ["10 MRU", "20 MRU", "30 MRU"],
          "correctAnswer": "20 MRU",
          "explanation": "Prix de revient = 60 MRU (pots) + 40 MRU (graines) = 100 MRU.\n Prix de vente = 120 MRU.\n Bénéfice = Prix de vente - Prix de revient = \n120 MRU - 100 MRU =\n 20 MRU.",
          "difficulty": "Facile",
          "matiere": "EconomieBasique",
          "division": "educationFinanciere"
      },
      {
          "id": "Q1",
          "question": "Fatou achète des crayons 🖍️ pour l'école pour 200 MRU et les vend à ses amis pour 300 MRU. A-t-elle fait un bénéfice ou une perte ?",
          "answers": ["Bénéfice", "Perte", "Ni l'un ni l'autre"],
          "correctAnswer": "Bénéfice",
          "explanation": "Elle a fait un bénéfice parce qu'elle a vendu les crayons plus cher qu'elle ne les a achetés."
      },
      {
          "id": "Q2",
          "question": "Un fermier vend des tomates 🍅 sur le marché. Il les achète pour 150 MRU et les vend pour 200 MRU. Quel est son bénéfice ?",
          "answers": ["30 MRU", "40 MRU", "50 MRU"],
          "correctAnswer": "50 MRU",
          "explanation": "Le bénéfice = prix de vente - prix d'achat = \n 200 MRU - 150 MRU = \n 50 MRU ."
      },
      {
          "id": "Q3",
          "question": "Ahmed vend un terrain 🏞️ qu'il a acheté pour 5000 MRU. Après avoir dépensé 1000 MRU pour le préparer, il le vend 7000 MRU. Combien a-t-il gagné ?",
          "answers": ["1000 MRU", "2000 MRU", "3000 MRU"],
          "correctAnswer": "1000 MRU",
          "explanation": " Prix de reviens = le coût total =  (achat + préparation) =\n 5000 + 1000 MRU = 6000 MRU.\n Bénéfice = Prix de vente - Prix de reviens =\n 7000 MRU - 6000 MRU =\n 1000 MRU ."
      },
      {
          "id": "Q4",
          "question": "Lina vend des sachets d'eau 💧 au marché. Elle achète un pack pour 50 MRU et le vend pour 100 MRU. Quel est son bénéfice ?",
          "answers": ["30 MRU", "40 MRU", "50 MRU"],
          "correctAnswer": "50 MRU",
          "explanation": "Bénéfice = Prix de vente - Prix d'achat  =\n 100 MRU - 50 MRU =\n 50 MRU .."
      },
    //   {
    //       "id": "Q5",
    //       "question": "Un marchand achète des chaises 🪑 pour 4000 MRU et dépense 1000 MRU pour les réparer. S'il les vend 6000 MRU, quel est son bénéfice ?",
    //       "answers": ["500 MRU", "1000 MRU", "1500 MRU"],
    //       "correctAnswer": "1000 MRU",
    //       "explanation": "Il faut soustraire les coûts totaux (achat + réparation) du prix de vente."
    //   },
    //   {
    //       "id": "Q6",
    //       "question": "Mariam vend des livres 📚 qu'elle a achetés pour 300 MRU. Après avoir dépensé 50 MRU pour les couvrir, elle les vend 400 MRU. Quel est son bénéfice ?",
    //       "answers": ["50 MRU", "100 MRU", "150 MRU"],
    //       "correctAnswer": "50 MRU",
    //       "explanation": "Le bénéfice est la différence entre le prix de vente et le coût total."
    //   },
    //   {
    //       "id": "Q7",
    //       "question": "Un groupe d'amis achète un ballon de football ⚽ pour 500 MRU et le vend pour 600 MRU après l'avoir utilisé. Ont-ils fait un bénéfice ou une perte ?",
    //       "answers": ["Bénéfice", "Perte", "Ni l'un ni l'autre"],
    //       "correctAnswer": "Bénéfice",
    //       "explanation": "Ils ont vendu le ballon plus cher qu'ils ne l'ont acheté."
    //   },
      {
          "id": "Q16",
          "question": "Un marchand de glaces 🍦 achète des cornets pour 200 MRU et les vend garnis pour 400 MRU. Quel est son bénéfice ?",
          "answers": ["150 MRU", "200 MRU", "250 MRU"],
          "correctAnswer": "200 MRU",
          "explanation": " Bénéfice = Prix de vente - Coût total.\nCalcul:\n 400 MRU - 200 MRU =\n 200 MRU."
      },
      {
          "id": "Q17",
          "question": "Une famille vend du jus d'orange 🍊 fait maison pour 600 MRU. Les oranges et le sucre coûtent 350 MRU. Quel est le bénéfice ?",
          "answers": ["200 MRU", "250 MRU", "300 MRU"],
          "correctAnswer": "250 MRU",
          "explanation": " Bénéfice = Prix de vente - Coût total.\nCalcul:\n 600 MRU - 350 MRU =\n 250 MRU."
      },
      {
          "id": "Q18",
          "question": "Un vendeur achète un lot de t-shirts 👕 pour 1000 MRU et les vend pour 1500 MRU. Quel est son bénéfice ?",
          "answers": ["400 MRU", "500 MRU", "600 MRU"],
          "correctAnswer": "500 MRU",
          "explanation": " Bénéfice = Prix de vente - Coût total.\nCalcul:\n 1500 MRU - 1000 MRU =\n 500 MRU."
      },
      {
          "id": "Q19",
          "question": "Un libraire achète des romans 📚 pour 800 MRU et les vend pour 1200 MRU. Quel est son bénéfice ?",
          "answers": ["300 MRU", "400 MRU", "500 MRU"],
          "correctAnswer": "400 MRU",
          "explanation": " Bénéfice = Prix de vente - Coût total.\nCalcul:\n 1200 MRU - 800 MRU =\n 400 MRU."
      },
      {
          "id": "Q20",
          "question": "Un agriculteur vend des légumes 🥕 qu'il a cultivés pour 2000 MRU. Le coût des semences et de l'eau est de 1200 MRU. Quel est son bénéfice ?",
          "answers": ["600 MRU", "700 MRU", "800 MRU"],
          "correctAnswer": "800 MRU",
          "explanation": " Bénéfice = Prix de vente - Coût total.\nCalcul:\n 2000 MRU - 1200 MRU =\n 800 MRU."
      },
       {
          "id": "Q21",
          "question": "Une école vend des cahiers 📓 pour 1500 MRU. Les cahiers et les autocollants coûtent 1000 MRU. Quel est le bénéfice ?",
          "answers": ["400 MRU", "500 MRU", "600 MRU"],
          "correctAnswer": "500 MRU",
          "explanation": " Bénéfice = Prix de vente - Coût total.\nCalcul:\n 1500 MRU - 1000 MRU =\n 500 MRU."
      },
      {
          "id": "Q22",
          "question": "Un jardinier vend un arbre 🌳 pour 800 MRU. L'achat de l'arbre et le soin coûtent 500 MRU. Quel est le bénéfice ?",
          "answers": ["200 MRU", "300 MRU", "400 MRU"],
          "correctAnswer": "300 MRU",
          "explanation": " Bénéfice = Prix de vente - Coût total.\nCalcul:\n 800 MRU - 500 MRU =\n 300 MRU."
      },
      {
          "id": "Q23",
          "question": "Une boulangerie vend une tarte 🥧 pour 600 MRU. Les ingrédients coûtent 350 MRU. Quel est le bénéfice ?",
          "answers": ["150 MRU", "250 MRU", "350 MRU"],
          "correctAnswer": "250 MRU",
          "explanation": " Bénéfice = Prix de vente - Coût total.\nCalcul:\n 600 MRU - 350 MRU =\n 250 MRU."
      },
      {
          "id": "Q24",
          "question": "Un musicien vend son CD 🎵 pour 400 MRU. La production du CD coûte 150 MRU. Quel est le bénéfice ?",
          "answers": ["150 MRU", "250 MRU", "350 MRU"],
          "correctAnswer": "250 MRU",
          "explanation": " Bénéfice = Prix de vente - Coût total.\nCalcul:\n 400 MRU - 150 MRU =\n 250 MRU."
      },
      {
          "id": "Q25",
          "question": "Un peintre vend un tableau 🖼️ pour 2000 MRU. Le matériel de peinture coûte 1200 MRU. Quel est le bénéfice ?",
          "answers": ["600 MRU", "800 MRU", "1000 MRU"],
          "correctAnswer": "800 MRU",
          "explanation": " Bénéfice = Prix de vente - Coût total.\nCalcul:\n 2000 MRU - 1200 MRU =\n 800 MRU."
      },
      {
          "id": "Q26",
          "question": "Un magasin vend des pots de fleurs 🌷 pour 900 MRU. L'achat des pots et des fleurs coûte 600 MRU. Quel est le bénéfice ?",
          "answers": ["200 MRU", "300 MRU", "400 MRU"],
          "correctAnswer": "300 MRU",
          "explanation": " Bénéfice = Prix de vente - Coût total.\nCalcul:\n 900 MRU - 600 MRU =\n 300 MRU."
      },
      {
          "id": "Q27",
          "question": "Une couturière vend une robe 👗 pour 1500 MRU. Le tissu et les accessoires coûtent 1000 MRU. Quel est le bénéfice ?",
          "answers": ["400 MRU", "500 MRU", "600 MRU"],
          "correctAnswer": "500 MRU",
          "explanation": " Bénéfice = Prix de vente - Coût total.\nCalcul:\n 1500 MRU - 1000 MRU =\n 500 MRU."
      },
      {
          "id": "Q28",
          "question": "Un libraire vend un atlas géographique 🌍 pour 700 MRU. L'achat de l'atlas lui a coûté 500 MRU. Quel est le bénéfice ?",
          "answers": ["150 MRU", "200 MRU", "250 MRU"],
          "correctAnswer": "200 MRU",
          "explanation": " Bénéfice = Prix de vente - Coût total.\nCalcul:\n 700 MRU - 500 MRU =\n 200 MRU."
      },
      {
          "id": "Q29",
          "question": "Un fabricant de jouets 🧸 vend un jouet pour 1200 MRU. La fabrication et le matériel coûtent 800 MRU. Quel est le bénéfice ?",
          "answers": ["300 MRU", "400 MRU", "500 MRU"],
          "correctAnswer": "400 MRU",
          "explanation": " Bénéfice = Prix de vente - Coût total.\nCalcul:\n 1200 MRU - 800 MRU =\n 400 MRU."
      },
      {
          "id": "Q30",
          "question": "Une entreprise vend un téléphone portable 📱 pour 4000 MRU. La production du téléphone coûte 3000 MRU. Quel est le bénéfice ?",
          "answers": ["800 MRU", "900 MRU", "1000 MRU"],
          "correctAnswer": "1000 MRU",
          "explanation": " Bénéfice = Prix de vente - Coût total.\nCalcul:\n 4000 MRU - 3000 MRU =\n 1000 MRU."
      },
      {
          "id": "Q31",
          "question": "Un pêcheur vend des poissons 🐟 qu’il a pêchés pour 2500 MRU. L’achat du filet et l'essence pour le bateau coûtent 1500 MRU. Quel est le bénéfice ?",
          "answers": ["800 MRU", "900 MRU", "1000 MRU"],
          "correctAnswer": "1000 MRU",
          "explanation": " Bénéfice = Prix de vente - Coût total.\nCalcul:\n 2500 MRU - 1500 MRU =\n 1000 MRU."
      },
      {
          "id": "Q32",
          "question": "Un marchand vend du thé 🍵 pour 800 MRU. Le thé et le sucre coûtent 500 MRU. Quel est le bénéfice ?",
          "answers": ["200 MRU", "300 MRU", "400 MRU","450 MRU"],
          "correctAnswer": "300 MRU",
          "explanation": " Bénéfice = Prix de vente - Coût total.\nCalcul:\n 800 MRU - 500 MRU =\n 300 MRU."
      },
      {
          "id": "Q33",
          "question": "Une famille vend un tapis traditionnel 🛖 pour 4000 MRU. La laine pour le tapis coûte 2000 MRU. Quel est le bénéfice ?",
          "answers": ["1500 MRU", "2000 MRU", "2500 MRU"],
          "correctAnswer": "2000 MRU",
          "explanation": " Bénéfice = Prix de vente - Coût total.\nCalcul:\n 4000 MRU - 2000 MRU =\n 2000 MRU."
      },
      {
          "id": "Q34",
          "question": "Un éleveur vend une chèvre 🐐 pour 1500 MRU. L’alimentation et les soins vétérinaires ont coûté 900 MRU. Quel est le bénéfice ?",
          "answers": ["400 MRU", "500 MRU", "600 MRU"],
          "correctAnswer": "600 MRU",
          "explanation": " Bénéfice = Prix de vente - Coût total.\nCalcul:\n 1500 MRU - 900 MRU\n = 600 MRU."
      },
      {
          "id": "Q35",
          "question": "Un artisan vend des bijoux en argent 💍 pour 3000 MRU. Les matériaux ont coûté 2000 MRU. Quel est le bénéfice ?",
          "answers": ["800 MRU", "900 MRU", "1000 MRU"],
          "correctAnswer": "1000 MRU",
          "explanation": " Bénéfice = Prix de vente - Coût total.\nCalcul:\n 3000 MRU - 2000 MRU =\n 1000 MRU."
      },
      {
          "id": "Q36",
          "question": "Un commerçant vend des dattes 🌴 pour 1200 MRU. L'achat des dattes et le transport coûtent 800 MRU. Quel est le bénéfice ?",
          "answers": ["300 MRU", "400 MRU", "500 MRU"],
          "correctAnswer": "400 MRU",
          "explanation": " Bénéfice = Prix de vente - Coût total.\nCalcul:\n 1200 MRU - 800 MRU =\n 400 MRU."
      },
      {
          "id": "Q37",
          "question": "Une coopérative vend du miel 🍯 pour 2500 MRU. La production du miel coûte 1500 MRU. Quel est le bénéfice ?",
          "answers": ["800 MRU", "900 MRU", "1000 MRU"],
          "correctAnswer": "1000 MRU",
          "explanation": " Bénéfice = Prix de vente - Coût total.\nCalcul:\n 2500 MRU - 1500 MRU =\n 1000 MRU."
      },
      {
          "id": "Q38",
          "question": "Un marchand vend des chapeaux de soleil 🧢 pour 1800 MRU. Il avait acheté les chapeaux pour 1200 MRU et a payé 300 MRU pour les customiser. Quel est le bénéfice ?",
          "answers": ["200 MRU", "300 MRU", "400 MRU"],
          "correctAnswer": "300 MRU",
          "explanation": " Bénéfice = Prix de vente - Coût total.\nCalcul:\n 1800 MRU - (1200 MRU + 300 MRU) =\n 300 MRU."
      },
      {
          "id": "Q39",
          "question": "Un agriculteur vend des sacs de riz 🌾 pour 2600 MRU. La culture du riz et l’emballage ont coûté 1800 MRU. Quel est le bénéfice ?",
          "answers": ["600 MRU", "700 MRU", "800 MRU"],
          "correctAnswer": "800 MRU",
          "explanation": " Bénéfice = Prix de vente - Coût total.\nCalcul:\n 2600 MRU - 1800 MRU =\n 800 MRU."
      },
      {
          "id": "Q40",
          "question": "Une boutique vend des sandales 🥿 pour 900 MRU. L’achat et la livraison des sandales coûtent 500 MRU. Quel est le bénéfice ?",
          "answers": ["300 MRU", "400 MRU", "500 MRU"],
          "correctAnswer": "400 MRU",
          "explanation": " Bénéfice = Prix de vente - Coût total.\nCalcul:\n 900 MRU - 500 MRU =\n 400 MRU."
      },
      {
          "id": "Q41",
          "question": "Un groupe de musique vend des billets pour un concert 🎫 pour 5000 MRU. La location de la salle et la publicité coûtent 3000 MRU. Quel est le bénéfice ?",
          "answers": ["1500 MRU", "2000 MRU", "2500 MRU"],
          "correctAnswer": "2000 MRU",
          "explanation": " Bénéfice = Prix de vente - Coût total.\nCalcul:\n 5000 MRU - 3000 MRU =\n 2000 MRU."
      },
      {
          "id": "Q42",
          "question": "Une famille vend des tapis faits main 📿 pour 3500 MRU. Les matériaux coûtent 2000 MRU et ils ont payé 500 MRU pour les outils. Quel est le bénéfice ?",
          "answers": ["800 MRU", "1000 MRU", "1200 MRU"],
          "correctAnswer": "1000 MRU",
          "explanation": " Bénéfice = Prix de vente - Coût total.\nCalcul:\n 3500 MRU - (2000 MRU + 500 MRU) =\n 1000 MRU."
      },
      {
          "id": "Q43",
          "question": "Un marchand de fruits vend des oranges 🍊 pour 1500 MRU. L’achat des oranges et les frais de transport coûtent 900 MRU. Quel est le bénéfice ?",
          "answers": ["400 MRU", "500 MRU", "600 MRU"],
          "correctAnswer": "600 MRU",
          "explanation": " Bénéfice = Prix de vente - Coût total.\nCalcul:\n 1500 MRU - 900 MRU =\n 600 MRU."
      },
      {
  "id": "Q45",
  "question": "Un artisan crée des lanternes 🏮 pour le marché nocturne et les vend pour 2200 MRU. Les matériaux et l'outil coûtent 1300 MRU. Quel est le bénéfice ?",
  "answers": ["700 MRU", "800 MRU", "900 MRU"],
  "correctAnswer": "900 MRU",
  "explanation": " Bénéfice = Prix de vente - Coût total.\nCalcul:\n 2200 MRU - 1300 MRU =\n 900 MRU."
  },
  {
  "id": "Q46",
  "question": "Un producteur de miel 🍯 vend sa récolte pour 3000 MRU. La maintenance des ruches et le soin des abeilles coûtent 1800 MRU. Quel est le bénéfice ?",
  "answers": ["900 MRU", "1000 MRU", "1200 MRU"],
  "correctAnswer": "1200 MRU",
  "explanation": " Bénéfice = Prix de vente - Coût total.\nCalcul:\n 3000 MRU - 1800 MRU =\n 1200 MRU."
  },
  {
  "id": "Q47",
  "question": "Un café ☕ vend des gâteaux pour 1600 MRU. Les ingrédients pour les gâteaux coûtent 900 MRU. Quel est le bénéfice ?",
  "answers": ["600 MRU", "700 MRU", "800 MRU"],
  "correctAnswer": "700 MRU",
  "explanation": " Bénéfice = Prix de vente - Coût total.\nCalcul:\n 1600 MRU - 900 MRU =\n 700 MRU."
  },
  {
  "id": "Q48",
  "question": "Un vendeur ambulant propose des boissons fraîches 🧃 pour 1200 MRU. L'achat des boissons et des glaçons coûte 700 MRU. Quel est le bénéfice ?",
  "answers": ["400 MRU", "500 MRU", "600 MRU"],
  "correctAnswer": "500 MRU",
  "explanation": " Bénéfice = Prix de vente - Coût total.\nCalcul:\n 1200 MRU - 700 MRU =\n 500 MRU."
  },
  {
  "id": "Q49",
  "question": "Une famille vend du pain maison 🍞 pour 900 MRU. La farine, la levure et le gaz coûtent 400 MRU. Quel est le bénéfice ?",
  "answers": ["400 MRU", "500 MRU", "600 MRU"],
  "correctAnswer": "500 MRU",
  "explanation": " Bénéfice = Prix de vente - Coût total.\nCalcul:\n 900 MRU - 400 MRU =\n 500 MRU."
  },
  {
  "id": "Q50",
  "question": "Un magasin de vêtements vend une belle robe 👗 pour 2500 MRU. L'achat de la robe et les frais de personnalisation coûtent 1700 MRU. Quel est le bénéfice ?",
  "answers": ["600 MRU", "700 MRU", "800 MRU"],
  "correctAnswer": "800 MRU",
  "explanation": " Bénéfice = Prix de vente - Coût total.\nCalcul:\n 2500 MRU - 1700 MRU = \n 800 MRU."},
  
   {
          "id": "Q10",
          "question": "Si tu as 1/2 d'une 🍉 et tu trouves une autre 1/2 🍉, combien de 🍉 as-tu ?",
          "answers": ["1/2", "1", "3/2", "2"],
          "correctAnswer": "1",
          "difficulty": "Facile",
          "matiere": "Mathematiques",
          "division": "fractions",
          "explanation": "Tu additionnes 1/2 + 1/2.\n Utilise la formule : \n  (axd + bxc) / (bxd).\n Ici, ça donne (1x2 + 1x2) / (2x2) = 4/4 = 1.\n Donc, tu as 1 🍉."
      },
      {
          "id": "Q11",
          "question": "👧 a 1/4 de 🥧 et 👦 donne à 👧 1/4 de la même 🥧. Combien de 🥧 ont-ils ?",
          "answers": ["1/2", "2/4", "1/4", "3/4"],
          "correctAnswer": "1/2",
          "difficulty": "Facile",
          "matiere": "Mathematiques",
          "division": "fractions",
          "explanation": "Additionne 1/4 + 1/4.\n  Avec la formule :\n  (axd + bxc) / (bxd) .\n On a (1x4 + 1x4) / (4x4) = \n  8/16 = 1/2.\n  Ils ont 1/2 de 🥧."
      },
      {
          "id": "Q12",
          "question": "👩‍🍳 a fait 3/4 d'un 🍰 et ajoute encore 1/4. Combien de 🍰 a-t-elle ?",
          "answers": ["1", "1/2", "4/4", "2"],
          "correctAnswer": "1",
          "difficulty": "Facile",
          "matiere": "Mathematiques",
          "division": "fractions",
          "explanation": "Elle a 3/4 + 1/4 de 🍰.\n  Avec la formule :\n (axd + bxc) / (bxd)\n , ça fait (3x4 + 1x4) / (4x4) =\n 16/16 = 1.\n Donc, elle a 1 🍰 complet."
      },
      {
          "id": "Q13",
          "question": "Tu bois 1/3 💧 et ton ami boit encore 1/3 💧. Combien de 💧 avez-vous bu ?",
          "answers": ["1/3", "2/3", "1/6", "1"],
          "correctAnswer": "2/3",
          "difficulty": "Facile",
          "matiere": "Mathematiques",
          "division": "fractions",
          "explanation": "Additionne 1/3 + 1/3.\n Utilise la Formule :\n(axd + bxc) / (bxd).\n Cela donne (1x3 + 1x3) / (3x3) = 6/9.\n qui simplifie à 2/3. \n vDonc ous avez bu 2/3 de 💧."
      },
  
  
      {
          "id": "Q1",
          "question": "Si tu bois 1/4 d'une bouteille d'eau 💧 et ton ami boit encore 1/4 💧, quelle partie de la bouteille avez-vous bu ensemble ?",
          "answers": ["1/2", "2/4", "1/4"],
          "correctAnswer": "1/2",
          "difficulty": "Facile",
          "matiere": "Mathematiques",
          "division": "fractions",
          "explanation": "1/4 + 1/4 équivaut à 2/4 \n qui simplifié donne 1/2 de la bouteille d'eau 💧."
      },
      {
          "id": "Q2",
          "question": "Tu as 1/3 de sac de riz 🍚 et ta mère ajoute un autre 1/3 de sac 🍚. Combien de sac de riz as-tu maintenant ?",
          "answers": ["2/3", "1/6", "1"],
          "correctAnswer": "2/3",
          "difficulty": "Facile",
          "matiere": "Mathematiques",
          "division": "fractions",
          "explanation": "En additionnant 1/3 et 1/3, on obtient 2/3 d'un sac de riz 🍚."
      },
      {
          "id": "Q3",
          "question": "Si un camion 🚚 transporte 1/2 d'un chargement de sable et reçoit encore 1/4 du même sable, quelle partie du chargement a-t-il au total ?",
          "answers": ["3/4", "1/4", "3/2"],
          "correctAnswer": "3/4",
          "difficulty": "Facile",
          "matiere": "Mathematiques",
          "division": "fractions",
          "explanation": "1/2 ajouté à 1/4 donne 3/4 du chargement de sable dans le camion 🚚."
      },
      {
          "id": "Q4",
          "question": "Lors d'un jeu, tu gagnes 1/6 de jeton 🎟️ et ton ami te donne 1/6 de jeton 🎟️. Combien de jetons as-tu au total ?",
          "answers": ["1/3", "2/6", "1/2"],
          "correctAnswer": "1/3",
          "difficulty": "Facile",
          "matiere": "Mathematiques",
          "division": "fractions",
          "explanation": "Additionner 1/6 et 1/6 donne 2/6, ce qui se simplifie en 1/3 de jeton 🎟️."
      },
      {
          "id": "Q5",
          "question": "Si tu manges 1/8 d'une pizza 🍕 et ton frère mange 2/8 de la même pizza 🍕, quelle partie de la pizza reste-t-il ?",
          "answers": ["5/8", "3/8", "7/8"],
          "correctAnswer": "5/8",
          "difficulty": "Facile",
          "matiere": "Mathematiques",
          "division": "fractions",
          "explanation": "Tu as mangé 1/8 et ton frère 2/8, donc ensemble vous avez mangé 3/8. Il reste donc 5/8 de la pizza 🍕."
      },
      {
          "id": "Q6",
          "question": "Tu prépares 1/3 de litre de thé 🍵. Si tu ajoutes encore 1/3 de litre de thé 🍵, combien de thé as-tu en tout ?",
          "answers": ["2/3", "1/6", "2/6"],
          "correctAnswer": "2/3",
          "difficulty": "Facile",
          "matiere": "Mathematiques",
          "division": "fractions",
          "explanation": "En additionnant 1/3 et 1/3, tu obtiens 2/3 litre de thé 🍵."
      },
      {
          "id": "Q7",
          "question": "Si une chèvre 🐐 mange 1/4 de sac de mil et une autre chèvre 🐐 mange encore 1/4, quelle part du sac ont-elles mangée ?",
          "answers": ["1/2", "2/4", "3/4"],
          "correctAnswer": "1/2",
          "difficulty": "Facile",
          "matiere": "Mathematiques",
          "division": "fractions",
          "explanation": "1/4 du sac mangé par la première chèvre plus 1/4 du sac mangé par la deuxième chèvre équivaut à 1/2 du sac."
      },
      {
          "id": "Q8",
          "question": "Lors d'une fête, tu bois 1/5 de bouteille de jus 🧃 et ton ami en boit aussi 1/5. Quelle fraction de la bouteille avez-vous bu ensemble ?",
          "answers": ["2/5", "1/10", "3/5"],
          "correctAnswer": "2/5",
          "difficulty": "Facile",
          "matiere": "Mathematiques",
          "division": "fractions",
          "explanation": "1/5 bu par toi plus 1/5 bu par ton ami fait 2/5 de la bouteille de jus 🧃."
      },
      {
          "id": "Q9",
          "question": "Si tu utilises 1/6 de sac de farine pour faire du pain 🍞 et ajoutes 1/6 pour des crêpes, quelle partie du sac utilises-tu ?",
          "answers": ["1/3", "2/6", "1/2"],
          "correctAnswer": "1/3",
          "difficulty": "Facile",
          "matiere": "Mathematiques",
          "division": "fractions",
          "explanation": "Utiliser 1/6 du sac pour le pain et 1/6 pour les crêpes équivaut à 2/6, qui se simplifie en 1/3 du sac."
      },
      {
          "id": "Q10",
          "question": "Dans un jeu vidéo 🎮, si tu gagnes 1/7 d'une étoile pour un niveau et 2/7 d'une étoile pour le suivant, quelle part de l'étoile as-tu gagnée ?",
          "answers": ["3/7", "1/14", "2/14"],
          "correctAnswer": "3/7",
          "difficulty": "Facile",
          "matiere": "Mathematiques",
          "division": "fractions",
          "explanation": "Gagner 1/7 d'une étoile puis 2/7 pour un autre niveau donne un total de 3/7 d'une étoile."
      },
          {
          "id": "Q1",
          "question": "Si tu as 1/2 🍕 et que tu partages cette moitié également entre 2 amis, quelle part de la pizza 🍕 chaque ami reçoit-il ?",
          "answers": ["1/4", "1/2", "2/4"],
          "correctAnswer": "1/4",
          "difficulty": "Facile",
          "matiere": "Mathematiques",
          "division": "fractions",
          "explanation": "Multiplier 1/2 de la pizza par 1/2 (chaque ami reçoit la moitié de ta moitié) donne 1/2 x 1/2 = 1/4 de la pizza pour chaque ami."
      },
      {
          "id": "Q2",
          "question": "Tu bois 1/3 d'une bouteille de jus 🧃 et veux donner la moitié de ce que tu as bu à ton frère. Quelle fraction de la bouteille totale lui donnes-tu ?",
          "answers": ["1/6", "2/6", "1/3"],
          "correctAnswer": "1/6",
          "difficulty": "Facile",
          "matiere": "Mathematiques",
          "division": "fractions",
          "explanation": "1/3 de la bouteille multiplié par 1/2 donne 1/6 de la bouteille totale pour ton frère."
      },
      {
          "id": "Q3",
          "question": "Si une recette demande 1/4 de sac de farine 🍞 et tu veux faire la moitié (1/2) de cette recette, quelle fraction du sac utilises-tu ?",
          "answers": ["1/8", "2/8", "1/4"],
          "correctAnswer": "1/8",
          "difficulty": "Facile",
          "matiere": "Mathematiques",
          "division": "fractions",
          "explanation": "Faire la moitié de 1/4 de sac de farine signifie multiplier 1/4 par 1/2, ce qui donne 1/8 du sac."
      },
      {
          "id": "Q4",
          "question": "Dans un jeu, tu as gagné 3/5 d'une étoile 🌟. Si tu perds 1/3 de ce que tu as gagné, quelle fraction de l'étoile as-tu encore ?",
          "answers": ["1/5", "2/5", "1/15"],
          "correctAnswer": "1/5",
          "difficulty": "Facile",
          "matiere": "Mathematiques",
          "division": "fractions",
          "explanation": "Perdre 1/3 de 3/5 d'une étoile signifie multiplier 3/5 par 2/3 (puisque perdre 1/3 équivaut à garder 2/3), donnant 6/15, qui se simplifie en 2/5. Correction: la réponse correcte est donc 2/5, non 1/5 comme initialement indiqué."
      },
      {
          "id": "Q5",
          "question": "Si tu utilises 2/6 d'un pot de peinture 🎨 pour dessiner et que tu décides d'utiliser seulement 1/2 de ce que tu as déjà utilisé pour une seconde couche, quelle fraction du pot utilises-tu pour cette seconde couche ?",
          "answers": ["1/6", "1/3", "1/12"],
          "correctAnswer": "1/6",
          "difficulty": "Facile",
          "matiere": "Mathematiques",
          "division": "fractions",
          "explanation": "Utiliser 1/2 de 2/6 du pot de peinture pour une seconde couche signifie multiplier 2/6 par 1/2, donnant 2/12, qui se simplifie en 1/6."
      },
  
      {
          "id": "Q1",
          "question": "Si le prix d'achat d'un chameau 🐪 est de 500 UM et que le prix de vente est de 600 UM, quel est le bénéfice réalisé ?",
          "answers": ["100 UM", "200 UM", "Aucun bénéfice"],
          "correctAnswer": "100 UM",
          "difficulty": "Facile",
          "matiere": "Mathématiques",
          "division": "Prix de vente, Bénéfice et Perte",
          "explanation": "Bénéfice = Prix de vente - Prix d'achat = 600 UM - 500 UM = 100 UM. Donc, le bénéfice réalisé est de 100 UM. 📈"
      },
      {
          "id": "Q2",
          "question": "Quelle est la valeur de 32 milliards 47 millions 562 mille 73 en notation numérique ?",
          "answers": ["32,047,562,073", "3,204,756,207", "320,475,620,73"],
          "correctAnswer": "32,047,562,073",
          "difficulty": "Facile",
          "matiere": "Mathématiques",
          "division": "Lecture et écriture des grands nombres",
          "explanation": "La valeur en notation numérique est directement lue à partir des classes : 32 milliards + 47 millions + 562 mille + 73 = 32,047,562,073. 📘"
      },
      {
          "id": "Q3",
          "question": "Quelle est la partie décimale du nombre 724,902 ?",
          "answers": ["724", "902", "0,902"],
          "correctAnswer": "902",
          "difficulty": "Facile",
          "matiere": "Mathématiques",
          "division": "Nombres décimaux",
          "explanation": "Dans le nombre 724,902, la partie avant la virgule est la partie entière et la partie après la virgule est la partie décimale. Donc, 902 est la partie décimale. 🔢"
      },
      {
          "id": "Q4",
          "question": "Si tu divises 200 UM entre toi et ton ami dans le rapport 2/3 pour toi et 1/3 pour lui, combien reçois-tu ?",
          "answers": ["133,33 UM", "66,66 UM", "100 UM"],
          "correctAnswer": "133,33 UM",
          "difficulty": "Facile",
          "matiere": "Mathématiques",
          "division": "Fractions",
          "explanation": "Pour toi : 200 UM x (2/3) = 133,33 UM. Tu reçois donc 133,33 UM. C'est calculé en multipliant la totalité par ta part du rapport. 🤝"
      },
      {
          "id": "Q5",
          "question": "Avec 5kg de riz 🍚, une famille peut se nourrir pendant 2 jours. Combien de jours la même quantité de riz peut-elle nourrir une seule personne ?",
          "answers": ["10 jours", "5 jours", "2 jours"],
          "correctAnswer": "10 jours",
          "difficulty": "Facile",
          "matiere": "Mathématiques",
          "division": "Proportionnalité",
          "explanation": "Si 5kg nourrissent une famille pour 2 jours, alors pour une personne, cela durerait 5 fois plus longtemps, soit 10 jours. C'est une question de proportionnalité. 📏"
      },
      {
          "id": "Q6",
          "question": "Quel est le pourcentage de 20 élèves réussissant un test sur un total de 40 élèves ?",
          "answers": ["50%", "20%", "40%"],
          "correctAnswer": "50%",
          "difficulty": "Facile",
          "matiere": "Mathématiques",
          "division": "Pourcentages",
          "explanation": "Pourcentage = (Nombre de réussites / Nombre total d'élèves) x 100 = (20 / 40) x 100 = 50%."
      },
          {
          "id": "Q7",
          "question": "Si Moussa épargne 150 UM par mois, combien aura-t-il épargné après un an ?",
          "answers": ["1 800 UM", "1 500 UM", "1 200 UM"],
          "correctAnswer": "1 800 UM",
          "difficulty": "Facile",
          "matiere": "Mathématiques",
          "division": "Calculs simples",
          "explanation": "Épargne annuelle = Épargne mensuelle × 12 = 150 UM × 12 = 1 800 UM. Moussa aura donc épargné 1 800 UM après un an. 💰"
      },
      {
          "id": "Q8",
          "question": "Quel est le périmètre d'un carré dont le côté mesure 4 cm ?",
          "answers": ["16 cm", "12 cm", "8 cm"],
          "correctAnswer": "16 cm",
          "difficulty": "Facile",
          "matiere": "Mathématiques",
          "division": "Géométrie",
          "explanation": "Périmètre du carré = 4 × Longueur d'un côté = 4 × 4 cm = 16 cm. Le périmètre du carré est donc de 16 cm. 📐"
      },
      {
          "id": "Q9",
          "question": "Combien de litres d'eau 💧 sont nécessaires pour remplir un aquarium de 10 dm³ ?",
          "answers": ["10 litres", "100 litres", "1 000 litres"],
          "correctAnswer": "10 litres",
          "difficulty": "Facile",
          "matiere": "Mathématiques",
          "division": "Mesures de capacité",
          "explanation": "1 dm³ équivaut à 1 litre. Donc, pour un aquarium de 10 dm³, il faudra 10 litres d'eau. 🐠"
      },
      {
          "id": "Q10",
          "question": "Si un triangle a une base de 8 cm et une hauteur de 4 cm, quelle est son aire ?",
          "answers": ["16 cm²", "32 cm²", "12 cm²"],
          "correctAnswer": "16 cm²",
          "difficulty": "Facile",
          "matiere": "Mathématiques",
          "division": "Géométrie",
          "explanation": "Aire du triangle = (Base × Hauteur) / 2 = (8 cm × 4 cm) / 2 = 32 cm² / 2 = 16 cm². L'aire du triangle est donc de 16 cm². 🔺"
      },
      {
          "id": "Q11",
          "question": "Quelle fraction de son argent Ali donne-t-il s'il partage 2/5 de 200 UM à son ami ?",
          "answers": ["40 UM", "80 UM", "120 UM"],
          "correctAnswer": "80 UM",
          "difficulty": "Facile",
          "matiere": "Mathématiques",
          "division": "Fractions",
          "explanation": "Ali donne 2/5 de 200 UM =\n (2/5) × 200 UM =\n 400 UM / 5 = 80 . \n UM à son ami. Il partage donc 80 UM. 💸"
      },
      {
          "id": "Q12",
          "question": "Combien y a-t-il de millilitres dans 1,5 litres de lait 🥛 ?",
          "answers": ["2000 ml", "1500 ml", "150 ml", "15000 ml"],
          "correctAnswer": "1500 ml",
          "difficulty": "Facile",
          "matiere": "Mathématiques",
          "division": "Mesures de capacité",
          "explanation": "1 litre = 1000 millilitres.\n Donc, 1,5 litres = 1,5 × 1000 ml = 1500 ml.\n Il y a donc 1500 ml dans 1,5 litres de lait. 🐄"
      },
      {
          "id": "Q13",
          "question": "Si tu as 10 🍎 et que tu en donnes 2 à ton ami, combien t'en reste-t-il ?",
          "answers": ["8", "7","9", "5"],
          "correctAnswer": "8",
          "difficulty": "Très facile",
          "matiere": "Mathématiques",
          "division": "Calcul simple",
          "explanation": "10 - 2 = 8.\n Il te reste 8 pommes."
      },
      {
          "id": "Q14",
          "question": "Quel est le plus grand, 1/2 ou 1/4 ?",
          "answers": ["1/2", "1/4", "Ils sont égaux"],
          "correctAnswer": "1/2",
          "difficulty": "Très facile",
          "matiere": "Mathématiques",
          "division": "Comparaison de fractions",
          "explanation": "1/2 est plus grand que 1/4."
      },
      {
          "id": "Q15",
          "question": "Si un gâteau coûte 100 UM et que tu as 50 UM, combien te manque-t-il pour l'acheter ?",
          "answers": ["50 UM", "60 UM", "40 UM"],
          "correctAnswer": "50 UM",
          "difficulty": "Très facile",
          "matiere": "Mathématiques",
          "division": "Soustraction",
          "explanation": "100 - 50 = 50.\n Il te manque 50 UM."
      },
      {
          "id": "Q16",
          "question": "3 fois 2 est égal à combien ?",
          "answers": ["6", "5", "4"],
          "correctAnswer": "6",
          "difficulty": "Très facile",
          "matiere": "Mathématiques",
          "division": "Multiplication",
          "explanation": "3 × 2 = 6."
      },
      {
          "id": "Q17",
          "question": "Combien y a-t-il de côtés dans un triangle ?",
          "answers": ["3", "4", "5"],
          "correctAnswer": "3",
          "difficulty": "Très facile",
          "matiere": "Mathématiques",
          "division": "Formes géométriques",
          "explanation": "Un triangle a 3 côtés."
      },
      {
          "id": "Q18",
          "question": "Quel nombre vient après 4 ?",
          "answers": ["5", "6", "7"],
          "correctAnswer": "5",
          "difficulty": "Très facile",
          "matiere": "Mathématiques",
          "division": "Nombres",
          "explanation": "Après 4, vient 5."
      },
      {
          "id": "Q19",
          "question": "10 divisé par 2 est égal à combien ?",
          "answers": ["5", "4", "6"],
          "correctAnswer": "5",
          "difficulty": "Très facile",
          "matiere": "Mathématiques",
          "division": "Division",
          "explanation": "10 ÷ 2 = 5."
      },
      {
          "id": "Q20",
          "question": "Si tu as 4 pièces de 1 UM et 2 pièces de 5 UM, combien d'argent as-tu ?",
          "answers": ["14 UM", "12 UM","11 UM", "10 UM"],
          "correctAnswer": "14 UM",
          "difficulty": "Très facile",
          "matiere": "Mathématiques",
          "division": "Addition",
          "explanation": "4 × 1 UM + 2 × 5 UM = 4 UM + 10 UM = 14 UM."
      },
      {
          "id": "Q21",
          "question": "Si un chameau coûte 300 UM et que tu le vends pour 400 UM, combien gagnes-tu ? 🐪",
          "answers": ["100 UM", "200 UM", "300 UM"],
          "correctAnswer": "100 UM",
          "difficulty": "Très facile",
          "matiere": "Mathématiques",
          "division": "Prix de vente, Bénéfice et Perte",
          "explanation": "Gain = Prix de vente - Prix d'achat = \n 400 - 300 = 100 UM."
      },
      {
          "id": "Q22",
          "question": "Quelle est la bonne écriture du nombre 'trois milliards deux cent quarante-sept millions six cent cinquante-deux mille soixante-treize' ?",
          "answers": ["3,247,652,073", "32,476,527,3", "324,765,207"],
          "correctAnswer": "3,247,652,073",
          "difficulty": "Très facile",
          "matiere": "Mathématiques",
          "division": "Lire et écrire les grands nombres",
          "explanation": "Le nombre s'écrit avec les milliards, millions, milliers et unités correctement placés."
      },
      {
          "id": "Q23",
          "question": "Combien y a-t-il de centièmes dans 3,56 ?",
          "answers": ["56", "356", "5",  "6"],
          "correctAnswer": "56",
          "difficulty": "Très facile",
          "matiere": "Mathématiques",
          "division": "Les nombres décimaux",
          "explanation": "Dans le nombre 3,56, les '56' représentent les centièmes."
      },
      {
          "id": "Q24",
          "question": "Quelle fraction de 200 UM donne-tu si tu partages 1/4 à ton ami ? 🤝",
          "answers": ["50 UM","20 UM", "25 UM", "75 UM"],
          "correctAnswer": "50 UM",
          "difficulty": "Très facile",
          "matiere": "Mathématiques",
          "division": "Les fractions",
          "explanation": "200 UM x 1/4 = 50 UM.\n Tu donnes 50 UM à ton ami."
      },
      {
          "id": "Q25",
          "question": "Si avec 3kg de farine on peut faire 2 gâteaux, combien de gâteaux peut-on faire avec 6kg ? 🎂",
          "answers": ["4", "3", "6"],
          "correctAnswer": "4",
          "difficulty": "Très facile",
          "matiere": "Mathématiques",
          "division": "La proportionnalité",
          "explanation": "Le double de farine, donc le double de gâteaux.\n 2 x 2 = 4 gâteaux."
      },
      {
          "id": "Q26",
          "question": "25% de 200 UM, ça fait combien ?",
          "answers": ["50 UM", "25 UM", "75 UM"],
          "correctAnswer": "50 UM",
          "difficulty": "Très facile",
          "matiere": "Mathématiques",
          "division": "Les pourcentages",
          "explanation": "25% de 200 = (25/100) x 200 = 50 UM."
      },
      {
          "id": "Q27",
          "question": "Quelle distance peut parcourir une voiture à 60 km/h en 2 heures ? 🚗",
          "answers": ["120 km", "100 km", "80 km", "90 km"],
          "correctAnswer": "120 km",
          "difficulty": "Très facile",
          "matiere": "Mathématiques",
          "division": "Les mouvements uniformes",
          "explanation": "Distance = Vitesse x Temps =\n 60 km/h x 2 h = 120 km."
      },
       {
          "id": "Q28",
          "question": "Quel est le périmètre d'un carré dont le côté mesure 5 cm ? 🟥",
          "answers": ["20 cm", "25 cm", "15 cm" , "10 cm"],
          "correctAnswer": "20 cm",
          "difficulty": "Très facile",
          "matiere":"Mathématiques",
          "division": "Géométrie - Le carré",
          "explanation": "Périmètre du carré = 4 x Longueur d'un côté =\n 4 x 5 cm = 20 cm."
      },
      {
          "id": "Q29",
          "question": "Si un sac de riz coûte 800 UM et qu'on te donne un rabais de 10%, combien paies-tu ? 💰",
          "answers": ["720 UM", "760 UM", "800 UM", "820 UM"],
          "correctAnswer": "720 UM",
          "difficulty": "Très facile",
          "matiere": "Mathématiques",
          "division": "Les pourcentages",
          "explanation": "Rabais = 10% de 800 UM =\n (10/100) x 800 =\n 80 UM.\n Prix après rabais = 800 - 80 =\n 720 UM."
      },
      {
          "id": "Q30",
          "question": "Quelle est la longueur d'un terrain de football si son périmètre est de 400 mètres et la largeur de 100 mètres ? ⚽",
          "answers": ["100 mètres", "120 mètres", "150 mètres", "200 mètres"],
          "correctAnswer": "100 mètres",
          "difficulty": "Très facile",
          "matiere": "Mathématiques",
          "division": "Calcul du périmètre",
          "explanation": "Périmètre = 2 x (Longueur + Largeur).\n Donc, Longueur = (Périmètre / 2) - Largeur =\n (400 / 2) - 100 =\n 100 mètres."
      },
      {
          "id": "Q31",
          "question": "Combien de temps faut-il pour remplir une piscine de 500 litres à un débit de 100 litres par heure ? 🕒",
          "answers": ["5 heures","15 heures", "10 heures", "2 heures"],
          "correctAnswer": "5 heures",
          "difficulty": "Très facile",
          "matiere": "Mathématiques",
          "division": "Proportionnalité",
          "explanation": "Temps = Volume / Débit =\n 500 litres / 100 litres par heure = 5 heures."
      },
      {
          "id": "Q32",
          "question": "Quel est le volume d'un cube dont chaque côté mesure 3 cm ? 🧊",
          "answers": ["27 cm³","20 cm³", "9 cm³", "6 cm³"],
          "correctAnswer": "27 cm³",
          "difficulty": "Très facile",
          "matiere": "Mathématiques",
          "division": "Géométrie - Le cube",
          "explanation": "Volume du cube = Côté³\n = 3 cm x 3 cm x 3 cm =\n 27 cm³."
      },
      {
          "id": "Q33",
          "question": "Si un litre de jus coûte 5 UM, combien coûtent 3 litres ? 🥤",
          "answers": ["15 UM", "10 UM","8 UM", "5 UM"],
          "correctAnswer": "15 UM",
          "difficulty": "Très facile",
          "matiere": "Mathématiques",
          "division": "Calcul simple",
          "explanation": "Coût pour 3 litres =\n 3 x 5 UM = 15 UM."
      },
      {
          "id": "Q34",
          "question": "Si tu plantes 2 arbres chaque jour, combien d'arbres auras-tu planté après une semaine ? 🌳",
          "answers": ["14", "10", "7", "5"],
          "correctAnswer": "14",
          "difficulty": "Très facile",
          "matiere": "Mathématiques",
          "division": "Multiplication",
          "explanation": "Nombre d'arbres plantés en une semaine =\n 2 arbres/jour x 7 jours =\n 14 arbres."
      },
      {
          "id": "Q35",
          "question": "Combien de morceaux de sucre 🍬 (2g chaque) peut-on obtenir d'un kilo de sucre ?",
          "answers": ["500", "100","1000", "50"],
          "correctAnswer": "500",
          "difficulty": "Très facile",
          "matiere": "Mathématiques",
          "division": "Mesures de Masses",
          "explanation": "1 kilo = 1000g.\n Nombre de morceaux = 1000g / 2g \n Donc par morceau = 500 morceaux."
      },
      {
          "id": "Q36",
          "question": "Si un livre coûte 200 UM et que tu as un coupon de 10% de réduction, combien économises-tu ? 📚",
          "answers": ["20 UM", "30 UM", "10 UM"],
          "correctAnswer": "20 UM",
          "difficulty": "Très facile",
          "matiere": "Mathématiques",
          "division": "Pourcentages",
          "explanation": "Réduction = 10% de 200 UM = \n ( 200 x 1/10) = \n 20 UM économisés."
      },
      {
          "id": "Q37",
          "question": "Quelle est l'aire d'un rectangle de 10 cm de long et 4 cm de large ?",
          "answers": ["40 cm²", "14 cm²", "20 cm²"],
          "correctAnswer": "40 cm²",
          "difficulty": "Très facile",
          "matiere": "Mathématiques",
          "division": "Géométrie - Le rectangle",
          "explanation": "Aire = Longueur x Largeur =\n 10 cm x 4 cm =\n 40 cm²."
      },
      {
          "id": "Q38",
          "question": "Combien de minutes y a-t-il dans 2 heures ? ⏰",
          "answers": ["120 minutes", "100 minutes", "60 minutes"],
          "correctAnswer": "120 minutes",
          "difficulty": "Très facile",
          "matiere": "Mathématiques",
          "division": "Mesures de Temps",
          "explanation": "1 heure = 60 minutes.\n donc 2 heures = 2 x 60 =\n 120 minutes."
      },
      {
          "id": "Q39",
          "question": "Quel est le plus petit, 1/3 ou 1/4 ?",
          "answers": ["1/3", "1/4", "Ils sont égaux"],
          "correctAnswer": "1/4",
          "difficulty": "Très facile",
          "matiere": "Mathématiques",
          "division": "Fractions",
          "explanation": "1/4 est plus petit que 1/3."
      },
      {
          "id": "Q40",
          "question": "Si un camion parcourt 150 km en 3 heures, quelle est sa vitesse moyenne ? 🚚",
          "answers": ["50 km/h", "45 km/h", "60 km/h"],
          "correctAnswer": "50 km/h",
          "difficulty": "Très facile",
          "matiere": "Mathématiques",
          "division": "Les mouvements uniformes",
          "explanation": "Vitesse moyenne = Distance / Temps\n  = 150 km / 3 h =\n 50 km/h."
      },
      {
          "id": "G1",
          "question": "Quelle est la formule pour calculer l'aire d'un rectangle ?",
          "answers": ["Longueur + Largeur", "Longueur / Largeur", "Longueur x Largeur"],
          "correctAnswer": "Longueur x Largeur",
          "difficulty": "Très facile",
          "matiere": "Mathématiques",
          "division": "Géométrie - Le rectangle",
          "explanation": "L'aire d'un rectangle se calcule en multipliant la longueur par la largeur.\n aire d'un rectangle = Longueur x Largeur"
      },
      {
          "id": "G2",
          "question": "Si un rectangle a une longueur de 5 cm et une largeur de 2 cm, quelle est son aire ?",
          "answers": ["10 cm²","8 cm²", "7 cm²", "14 cm²"],
          "correctAnswer": "10 cm²",
          "difficulty": "Très facile",
          "matiere": "Mathématiques",
          "division": "Géométrie - Le rectangle",
          "explanation": "Aire = Longueur x Largeur \n = 5 cm x 2 cm =\n 10 cm²."
      },
      {
          "id": "G3",
          "question": "Le périmètre d'un rectangle est de 20 cm. Si la longueur est de 6 cm, quelle est la largeur ?",
          "answers": ["4 cm", "5 cm","6 cm", "7 cm"],
          "correctAnswer": "4 cm",
          "difficulty": "Très facile",
          "matiere": "Mathématiques",
          "division": "Géométrie - Le rectangle",
          "explanation": "Périmètre = 2 x (Longueur + Largeur).\n 20 = 2 x (6 + Largeur).\n Donc Largeur = 4 cm."
      },
      {
          "id": "G4",
          "question": "Comment appelle-t-on un rectangle avec tous les côtés de même longueur ?",
          "answers": ["Un carré 🟥", "Un cercle 🔴", "Un triangle 🔺"],
          "correctAnswer": "Un carré 🟥",
          "difficulty": "Très facile",
          "matiere": "Mathématiques",
          "division": "Géométrie - Le rectangle",
          "explanation": "Un rectangle avec tous les côtés de même longueur est appelé un carré 🟥."
      },
      {
          "id": "G5",
          "question": "Si la largeur d'un rectangle est le double de sa longueur et que la longueur mesure 3 cm, quelle est l'aire du rectangle ?",
          "answers": ["18 cm²", "9 cm²", "6 cm²"],
          "correctAnswer": "18 cm²",
          "difficulty": "Très facile",
          "matiere": "Mathématiques",
          "division": "Géométrie - Le rectangle",
          "explanation": "Largeur = 2 x Longueur = 6 cm.\n Aire = Longueur x Largeur =\n 3 cm x 6 cm =\n 18 cm²."
      },
      {
          "id": "G6",
          "question": "Quelle est la formule pour calculer le périmètre d'un rectangle ?",
          "answers": ["2 x (Longueur + Largeur)", "Longueur x Largeur", "Longueur + Largeur"],
          "correctAnswer": "2 x (Longueur + Largeur)",
          "difficulty": "Très facile",
          "matiere": "Mathématiques",
          "division": "Géométrie - Le rectangle",
          "explanation": "Le périmètre d'un rectangle se calcule avec la formule:\n 2 x (Longueur + Largeur)."
      },
      {
          "id": "G7",
          "question": "Un rectangle a une aire de 24 cm² et une longueur de 8 cm. Quelle est sa largeur ?",
          "answers": ["3 cm", "4 cm", "6 cm"],
          "correctAnswer": "3 cm",
          "difficulty": "Très facile",
          "matiere": "Mathématiques",
          "division": "Géométrie - Le rectangle",
          "explanation": "Aire = Longueur x Largeur.\n donc Largeur = Aire / Longueur =\n 24 cm² / 8 cm =\n 3 cm."
      },
      {
          "id": "G8",
          "question": "Si un rectangle a une largeur de 4 cm et un périmètre de 16 cm, quelle est sa longueur ?",
          "answers": ["4 cm","2 cm", "3 cm", "5 cm"],
          "correctAnswer": "4 cm",
          "difficulty": "Très facile",
          "matiere": "Mathématiques",
          "division": "Géométrie - Le rectangle",
          "explanation": "Périmètre = 2 x (Longueur + Largeur).\n donc Longueur = (Périmètre / 2) - Largeur =\n (16 / 2) - 4 =\n 4 cm."
      },
      {
          "id": "G9",
          "question": "Quelle propriété les diagonales d'un rectangle ont-elles ?",
          "answers": ["Elles sont perpendiculaires", "Elles sont de longueurs différentes", "Elles se coupent en leur milieu"],
          "correctAnswer": "Elles se coupent en leur milieu",
          "difficulty": "Très facile",
          "matiere": "Mathématiques",
          "division": "Géométrie - Le rectangle",
          "explanation": "Les diagonales d'un rectangle se coupent en leur milieu et sont de même longueur."
      },
      {
          "id": "G10",
          "question": "Si la longueur d'un rectangle est de 10 cm et son aire de 80 cm², quelle est sa largeur ?",
          "answers": ["7 cm","8 cm", "10 cm", "12 cm"],
          "correctAnswer": "8 cm",
          "difficulty": "Très facile",
          "matiere": "Mathématiques",
          "division": "Géométrie - Le rectangle",
          "explanation": "Aire = Longueur x Largeur.\n donc Largeur = Aire / Longueur =\n 80 cm² / 10 cm = \n 8 cm."
      },
      {
          "id": "G11",
          "question": "Qu'est-ce qui est plus long dans un rectangle, la longueur ou la largeur ?",
          "answers": ["La longueur", "La largeur", "Cela dépend du rectangle"],
          "correctAnswer": "Cela dépend du rectangle",
          "difficulty": "Très facile",
          "matiere": "Mathématiques",
          "division": "Géométrie - Le rectangle",
          "explanation": "Dans un rectangle, la longueur est généralement plus longue que la largeur, mais cela peut varier."
      },
     
      {
          "id": "G13",
          "question": "Un terrain de jeu rectangulaire a une aire de 120 m² et une longueur de 15 m. Quelle est sa largeur ?",
          "answers": ["8 m", "10 m", "12 m"],
          "correctAnswer": "8 m",
          "difficulty": "Très facile",
          "matiere": "Mathématiques",
          "division": "Géométrie - Le rectangle",
          "explanation": "Aire = Longueur x Largeur,.\n Donc Largeur = Aire / Longueur =.\n 120 m² / 15 m =.\n 8 m."
      },
      {
          "id": "G14",
          "question": "Comment s'appelle un angle d'un rectangle ?",
          "answers": ["Un angle droit", "Un angle aigu", "Un angle obtus"],
          "correctAnswer": "Un angle droit",
          "difficulty": "Très facile",
          "matiere": "Mathématiques",
          "division": "Géométrie - Le rectangle",
          "explanation": "Tous les angles d'un rectangle sont des angles droits (90 degrés)."
      },
      {
          "id": "G15",
          "question": "Si un rectangle a des côtés de 6 cm et 8 cm, combien mesure la diagonale ?",
          "answers": ["5 cm","10 cm", "14 cm", "7 cm"],
          "correctAnswer": "10 cm",
          "difficulty": "Très facile",
          "matiere": "Mathématiques",
          "division": "Géométrie - Le rectangle",
          "explanation": "La diagonale d'un rectangle peut être trouvée avec le théorème de Pythagore..\n Diagonale² = Longueur² + Largeur².\n = 6² + 8² = 36 + 64 = 100..\n donc la diagonale = √100 =.\n 10 cm."
      },
      {
          "id": "G16",
          "question": "Peut-on avoir un rectangle avec tous les côtés de même longueur ?",
          "answers": ["Oui", "Non", "Seulement en théorie"],
          "correctAnswer": "Non",
          "difficulty": "Très facile",
          "matiere": "Mathématiques",
          "division": "Géométrie - Le rectangle",
          "explanation": "Un rectangle avec tous les côtés de même longueur est un carré, donc par définition, un rectangle ne peut pas avoir tous les côtés égaux."
      },
      {
          "id": "G17",
          "question": "Quelle est la largeur d'un rectangle si son périmètre est de 24 cm et sa longueur de 7 cm ?",
          "answers": ["5 cm", "10 cm", "3 cm"],
          "correctAnswer": "5 cm",
          "difficulty": "Très facile",
          "matiere": "Mathématiques",
          "division": "Géométrie - Le rectangle",
          "explanation": "Périmètre = 2(Largeur + Longueur).\n 24 = 2(7 + Largeur),.\n résoudre pour Largeur donne Largeur = 5 cm."
      },
      {
          "id": "G18",
          "question": "Comment calcule-t-on le périmètre d'un rectangle de longueur 9 m et de largeur 4 m ?",
          "answers": ["26 m", "52 m", "13 m"],
          "correctAnswer": "26 m",
          "difficulty": "Très facile",
          "matiere": "Mathématiques",
          "division": "Géométrie - Le rectangle",
          "explanation": "Périmètre = 2 x (Longueur + Largeur).\n= 2 x (9m + 4m) =.\n 26 m."
      },
      {
          "id": "G19",
          "question": "Si l'aire d'un rectangle est de 56 cm² et que sa largeur est de 7 cm, quelle est sa longueur ?",
          "answers": ["8 cm", "9 cm", "7 cm"],
          "correctAnswer": "8 cm",
          "difficulty": "Très facile",
          "matiere": "Mathématiques",
          "division": "Géométrie - Le rectangle",
          "explanation": "Aire = Longueur x Largeur.\n donc Longueur = Aire / Largeur =\n 56 cm² / 7 cm =\n 8 cm."
      },
      {
          "id": "G20",
          "question": "Un rectangle a une longueur de 10 cm de plus que sa largeur. Si la largeur est de 30 cm, quel est le périmètre du rectangle ?",
          "answers": ["80 cm", "100 cm", "120 cm"],
          "correctAnswer": "100 cm",
          "difficulty": "Très facile",
          "matiere": "Mathématiques",
          "division": "Géométrie - Le rectangle",
          "explanation": "Longueur = 30 cm + 10 cm = 40 cm.\n Périmètre = 2 x (Longueur + Largeur) =\n 2 x (40 cm + 30 cm) =\n 100 cm."
      },
      {
          "id": "P1",
          "question": "Quel est 50% de 100 ?",
          "answers": ["50", "25", "75"],
          "correctAnswer": "50",
          "explanation": "50% de 100 est calculé comme.\n (50/100) x 100 = 50."
      },
      {
          "id": "P2",
          "question": "Si tu as 20 bonbons et que tu en manges 20%, combien en as-tu mangé ?",
          "answers": ["3","4", "5", "10"],
          "correctAnswer": "4",
          "explanation": "20% de 20 est (20/100) x 20 = 4."
      },
      {
          "id": "P3",
          "question": "Une robe coûte 200 UM et a une réduction de 10%. Combien coûte la robe après la réduction ?",
          "answers": ["180 UM", "190 UM", "160 UM"],
          "correctAnswer": "180 UM",
          "explanation": "La réduction est de (10/100) x 200 UM =\n 20 UM.\n Donc, le nouveau prix est :\n 200 UM - 20 UM = 180 UM."
      },
      {
          "id": "P4",
          "question": "Quel est le nouveau prix d'un jeu vidéo de 50 UM si on applique une augmentation de 20% ?",
          "answers": ["60 UM", "55 UM", "70 UM"],
          "correctAnswer": "60 UM",
          "explanation": "L'augmentation est de (20/100) x 50 UM =\n 10 UM.\n Donc, le nouveau prix est \n 50 UM + 10 UM = 60 UM."
      },
      {
          "id": "P5",
          "question": "Un sac contient 120 billes, dont 20% sont bleues. Combien y a-t-il de billes bleues ?",
          "answers": ["20","24", "12", "36"],
          "correctAnswer": "24",
          "explanation": "20% de 120 est (20/100) x 120 = 24."
      },
      {
          "id": "P6",
          "question": "Si une ville a 40000 habitants et que 25% sont des étudiants, combien y a-t-il d'étudiants ?",
          "answers": ["10000","16000", "15000", "5000"],
          "correctAnswer": "10000",
          "explanation": "25% de 40 000 est (25/100) x 40 000 = 10000."
      },
      {
          "id": "P7",
          "question": "Un livre coûte 80 UM après une réduction de 20%. Quel était son prix original ?",
          "answers": ["100 UM", "96 UM", "104 UM"],
          "correctAnswer": "100 UM",
          "explanation": "Si 80 UM représente 80%, alors le prix original (100%) est calculé comme.\n 80 UM / 0.8 = 100 UM."
      },
      {
          "id": "P8",
          "question": "Si tu réponds correctement à 75% des 12 questions d'un quiz, combien de réponses correctes as-tu données ?",
          "answers": ["9", "8","7", "10"],
          "correctAnswer": "9",
          "explanation": "75% de 12 est (75/100) x 12 = 9."
      },
      {
          "id": "P9",
          "question": "Une paire de chaussures est vendue 150 UM après une réduction de 25%. Quel était le prix avant réduction ?",
          "answers": ["200 UM","170 UM", "180 UM", "120 UM"],
          "correctAnswer": "200 UM",
          "explanation": "Si 150 UM représente 75% (après réduction de 25%).\n alors le prix original est 150 UM / 0.75 = 200 UM."
      },
      {
          "id": "P10",
          "question": "Une école a 500 élèves. Si 60% sont des filles, combien y a-t-il de garçons ?",
          "answers": ["200", "250", "300", "400"],
          "correctAnswer": "200",
          "explanation": "Si 60% sont des filles, alors 40% sont des garçons.\n 40% de 500 est (40/100) x 500 = 200.\n Donc, il y a 200 garçons."
          },
      {
          "id": "P11",
          "question": "Quel est 10% de 500 ?",
          "answers": ["40","50", "5", "500"],
          "correctAnswer": "50",
          "explanation": "10% de 500 est calculé comme (10/100) x 500 = 50."
      },
      {
          "id": "P12",
          "question": "Si un sac de riz pèse 25kg et qu'on perd 5% de son poids lors du transport, combien pèse le sac à l'arrivée ?",
          "answers": ["23.75 kg", "24.5 kg","25 kg", "22 kg"],
          "correctAnswer": "23.75 kg",
          "explanation": "Perte = 5% de 25kg =\n (5/100) x 25 =\n 1.25 kg.\n Poids à l'arrivée = 25 kg - 1.25 kg =\n 23.75 kg."
      },
      {
          "id": "P13",
          "question": "Une batterie de téléphone est chargée à 40% et gagne 30% de charge. À quel pourcentage est-elle chargée maintenant ?",
          "answers": ["70%", "80%", "100%"],
          "correctAnswer": "70%",
          "explanation": "Charge initiale de 40% + gain de 30% =\n 70% de charge."
      },
      {
          "id": "P14",
          "question": "Un produit coûte initialement 200 UM. Après une augmentation de 50%, quel est le nouveau prix ?",
          "answers": ["300 UM","240 UM", "250 UM", "350 UM"],
          "correctAnswer": "300 UM",
          "explanation": "Augmentation = 50% de 200 UM =\n (50/100) x 200 =\n 100 UM.\n Nouveau prix = 200 UM + 100 UM =\n 300 UM."
      },
      {
          "id": "P15",
          "question": "Dans une classe de 30 élèves, si 60% sont des filles, combien y a-t-il de garçons ?",
          "answers": ["12", "18","14", "15"],
          "correctAnswer": "12",
          "explanation": "Nombre de filles = 60% de 30 =\n (60/100) x 30 =\n 18 filles.\n Donc, nombre de garçons = 30 - 18 = 12."
      },
      {
          "id": "P16",
          "question": "Le prix d'un article a été réduit de 20% pour une vente, le rendant 160 UM. Quel était le prix original ?",
          "answers": ["200 UM", "180 UM", "220 UM"],
          "correctAnswer": "200 UM",
          "explanation": "Si 160 UM représente 80% (après réduction de 20%).\n Le prix original est 160 UM / 0.8 = 200 UM."
      },
      {
          "id": "P17",
          "question": "Quel est 25% d'un quart ?",
          "answers": ["6.25%", "12.5%", , "13%"],
          "correctAnswer": "6.25%",
          "explanation": "25% d'un quart (1/4 = 25%) est (25/100) x 25% = 6.25%."
      },
      {
          "id": "P18",
          "question": "Si l'on augmente un nombre de 10% puis de 20%, de quel pourcentage total a-t-il augmenté ?",
          "answers": ["20%","32%", "30%", "28%"],
          "correctAnswer": "32%",
          "explanation": "L'augmentation n'est pas simplement additive (10% + 20%) à cause de l'effet composé.\n L'augmentation totale est de 32%."
      },
      {
          "id": "P19",
          "question": "Un pantalon coûte 80 UM après une réduction de 20%. Quel était le prix avant la réduction ?",
          "answers": ["100 UM", "96 UM", "104 UM"],
          "correctAnswer": "100 UM",
          "explanation": "Si 80 UM représente 80% (après réduction), alors le prix original (100%) est 80 UM / 0.8 = 100 UM."
      },
      {
          "id": "P20",
           "question": "Si une équipe gagne 75% de ses 20 matchs, combien de matchs a-t-elle perdus ?",
          "answers": ["5", "6","10", "15"],
          "correctAnswer": "5",
          "explanation": "L'équipe a gagné 75% de 20 matchs, soit 15 matchs (75/100 x 20).\n Donc, elle a perdu 20 - 15 = 5 matchs."
      },
       {
          "id": "PR1",
          "question": "Si 5 stylos coûtent 10 UM, combien coûtent 15 stylos ?",
          "answers": ["30 UM", "20 UM", "10 UM"],
          "correctAnswer": "30 UM",
          "explanation": "Le prix est proportionnel au nombre de stylos.\n 5 stylos = 10 UM, donc 1 stylo = 2 UM.\n Pour 15 stylos : 15 x 2 UM = 30 UM."
      },
      {
          "id": "PR2",
          "question": "3 kg de pommes coûtent 6 UM. Combien coûtent 5 kg ?",
          "answers": ["10 UM", "8 UM", "12 UM"],
          "correctAnswer": "10 UM",
          "explanation": "Prix par kg = 6 UM / 3 kg = 2 UM/kg.\n Pour 5 kg : 5 x 2 UM = 10 UM."
      },
      {
          "id": "PR3",
          "question": "Une voiture parcourt 120 km en 2 heures. Quelle distance parcourt-elle en 5 heures ?",
          "answers": ["400 km","300 km", "240 km", "600 km"],
          "correctAnswer": "300 km",
          "explanation": "Vitesse = 120 km / 2 h =\n 60 km/h.\n En 5 h : 60 km/h x 5 h = 300 km."
      },
      {
          "id": "PR4",
          "question": "Si 2 litres de peinture couvrent 6 m², combien de m² couvrent 5 litres ?",
          "answers": ["15 m²", "12 m²", "18 m²", "13 m²"],
          "correctAnswer": "15 m²",
          "explanation": "Couverture par litre = 6 m² / 2 litres = 3 m²/litre.\n Pour 5 litres : 5 x 3 m² = 15 m²."
      },
      {
          "id": "PR5",
          "question": "20 biscuits fournissent 400 kcal. Combien de kcal fournissent 35 biscuits ?",
          "answers": ["500 kcal","700 kcal", "800 kcal", "350 kcal"],
          "correctAnswer": "700 kcal",
          "explanation": "Kcal par biscuit = 400 kcal / 20 biscuits =\n 20 kcal/biscuit.\n Pour 35 biscuits : 35 x 20 kcal = 700 kcal."
      },
      {
          "id": "PR6",
          "question": "Si un sac de farine de 10 kg coûte 30 UM, combien coûte un sac de 15 kg ?",
          "answers": ["45 UM", "40 UM", "35 UM"],
          "correctAnswer": "45 UM",
          "explanation": "Le prix est proportionnel au poids. 10 kg = 30 UM, donc 1 kg = 3 UM.\n Pour 15 kg : 15 x 3 UM = 45 UM."
      },
      {
          "id": "PR7",
          "question": "8 heures de travail rapportent 64 UM. Combien rapportent 10 heures ?",
          "answers": ["80 UM", "72 UM", "90 UM"],
          "correctAnswer": "80 UM",
          "explanation": "Salaire par heure = 64 UM / 8 h =\n 8 UM/h.\n Pour 10 h : 10 x 8 UM = 80 UM."
      },
      {
          "id": "PR8",
          "question": "Si 50 cm de tissu coûtent 20 UM, combien coûtent 200 cm ?",
          "answers": ["80 UM", "40 UM", "100 UM"],
          "correctAnswer": "80 UM",
          "explanation": "Prix par cm = 20 UM / 50 cm =\n 0.4 UM/cm.\n Pour 200 cm : 200 x 0.4 UM = 80 UM."
      },
      {
          "id": "PR9",
          "question": "Un robinet remplit 150 litres en 3 heures. Combien de temps pour remplir 250 litres ?",
          "answers": ["5 heures", "4 heures", "6 heures"],
          "correctAnswer": "5 heures",
          "explanation": "Débit = 150 litres / 3 h =\n 50 litres/h.\n Temps pour 250 litres :\n 250 litres / 50 litres/h =\n 5h"
          },
  
   {
          "id": "PR11",
          "question": "Une recette nécessite 500 g de farine pour faire 10 crêpes. Combien de crêpes peut-on faire avec 1 kg de farine ?",
          "answers": ["20", "15", "25", "35"],
          "correctAnswer": "20",
          "explanation": "Double de la farine signifie double du nombre de crêpes. Donc, avec 1 kg (le double de 500 g), on peut faire 20 crêpes."
      },
      {
          "id": "PR13",
          "question": "Si un vélo parcourt 30 km en 2 heures, quelle distance parcourra-t-il en 3 heures à la même vitesse ?",
          "answers": ["45 km", "40 km", "50 km"],
          "correctAnswer": "45 km",
          "explanation": "Vitesse = 30 km / 2 h = 15 km/h.\n En 3 h : 15 km/h x 3 h = 45 km."
      },
      {
          "id": "PR14",
          "question": "Si 4 lampes consomment 80 watts, combien de watts consomment 10 lampes ?",
          "answers": ["200 watts", "150 watts", "100 watts"],
          "correctAnswer": "200 watts",
          "explanation": "Consommation unitaire = 80 watts / 4 lampes = 20 watts/lampe.\n Pour 10 lampes : 10 x 20 watts = 200 watts."
      },
      {
          "id": "PR15",
          "question": "12 bonbons sont partagés équitablement entre 4 enfants. Combien chaque enfant reçoit-il de bonbons si le nombre d'enfants double ?",
          "answers": ["3 bonbons", "6 bonbons", "2 bonbons"],
          "correctAnswer": "3 bonbons",
          "explanation": "Initialement, chaque enfant reçoit 3 bonbons (12 bonbons / 4 enfants).\n Si le nombre d'enfants double, chaque enfant reçoit toujours 3 bonbons car le total de bonbons et le nombre d'enfants n'ont pas changé dans l'énoncé."
      },
      {
          "id": "PR16",
          "question": "Une machine produit 200 pièces en 8 heures. Combien d'heures faut-il pour produire 500 pièces ?",
          "answers": ["20 heures", "25 heures", "40 heures"],
          "correctAnswer": "20 heures",
          "explanation": "Productivité = 200 pièces / 8 h = 25 pièces/h.\n Pour 500 pièces : 500 pièces / 25 pièces/h = 20 heures."
      },
      {
          "id": "PR17",
          "question": "Un jardin de 30 m² nécessite 60 litres d'eau pour être arrosé. Combien de litres sont nécessaires pour un jardin de 45 m² ?",
          "answers": ["90 litres", "80 litres", "100 litres"],
          "correctAnswer": "90 litres",
          "explanation": "Ratio eau/surface =\n 60 litres / 30 m² =\n 2 litres/m².\n Pour 45 m² : 45 m² x 2 litres/m² = 90 litres."
      },
      {
          "id": "PR18",
          "question": "Si 60 km sont parcourus en 1 heure, quelle est la vitesse en mètres par seconde ?",
          "answers": ["16.67 m/s", "15 m/s", "20 m/s"],
          "correctAnswer": "16.67 m/s",
          "explanation": "Vitesse = 60 km/h = 60,000 m / 3600 s = 16.67 m/s."
      },{
          "id": "PR19",
          "question": "Une recette pour  4 personnes utilise 400 g de pâtes. Combien de grammes sont nécessaires pour 6 personnes ?",
          "answers": ["600 g","700 g", "800 g", "500 g"],
          "correctAnswer": "600 g",
          "explanation": "Le nombre de personnes augmente de 50% (de 4 à 6), donc la quantité de pâtes augmente également de 50%. 400 g + 50% de 400 g = 600 g."
      },
      {
          "id": "PR20",
          "question": "Si un champ peut nourrir 10 chevaux 🐴🐴 pendant 20 jours, pendant combien de jours peut-il nourrir 5 chevaux 🐴🐴 ?",
          "answers": ["40 jours", "30 jours", "20 jours", "25 jours"],
          "correctAnswer": "40 jours",
          "explanation": "Moins de chevaux signifie plus de jours de nourriture disponibles.\n Le champ peut nourrir 5 chevaux 🐴🐴 pour le double du temps :\n 20 jours x 2 = 40 jours."
      },
      {
          "id": "PR21",
          "question": "Un sac de ciment de 50 kg coûte 25 UM. Combien coûte un sac de 75 kg ?",
          "answers": ["37.5 UM", "35 UM", "40 UM"],
          "correctAnswer": "37.5 UM",
          "explanation": "Le coût est proportionnel au poids.\n 50 kg = 25 UM,\n donc 1 kg coûte 0.5 UM.\n Pour 75 kg : 75 x 0.5 UM = 37.5 UM."
      },
      {
          "id": "PR22",
          "question": "Une équipe de 4 jardiniers plante 200 arbres en 3 jours. Combien d'arbres 6 jardiniers peuvent-ils planter dans le même temps ?",
          "answers": ["300 arbres", "400 arbres", "500 arbres"],
          "correctAnswer": "300 arbres",
          "explanation": "Avec 50% de jardiniers en plus, la production augmente de 50%.\n 200 arbres + 50% de 200 = 300 arbres."
      },
      {
          "id": "PR23",
          "question": "Si 250 ml de jus de fruit sont nécessaires pour faire 2 verres 🥛, combien de ml sont nécessaires pour faire 5 verres 🥛 ?",
          "answers": ["625 ml", "500 ml", "750 ml"],
          "correctAnswer": "625 ml",
          "explanation": "Plus de verres signifie plus de jus nécessaire.\n Pour 5 verres 🥛, proportionnellement : (250 ml / 2) x 5 = 625 ml."
      },
      {
          "id": "PR24",
          "question": "Une picine de 100 litres accueille 20 poissons 🐟. Combien de poissons peut-on accueillir dans une picine de 150 litres ?",
          "answers": ["30 poissons", "25 poissons", "40 poissons"],
          "correctAnswer": "30 poissons",
          "explanation": "La capacité d'accueil augmente proportionnellement avec le volume.\n 100l = 20 poissons, donc 150l = 30 poissons 🐟."
      },
      {
          "id": "PR25",
          "question": "Un trajet de 180 km coûte 90 UM en carburant. Combien coûterait un trajet de 240 km ?",
          "answers": ["120 UM", "100 UM", "130 UM"],
          "correctAnswer": "120 UM",
          "explanation": "Le coût du carburant augmente avec la distance. 180 km = 90 UM, donc 240 km coûterait (240/180) x 90 UM = 120 UM."
      },
      {
          "id": "PR26",
          "question": "Un livre contient 300 mots par page. Combien de mots contient un livre de 150 pages ?",
          "answers": ["45 000 mots", "40 000 mots", "50 000 mots"],
          "correctAnswer": "45 000 mots",
          "explanation": "Nombre total de mots = nombre de pages x mots par page =\n 150 x 300 = 45 000 mots."
      },
      {
          "id": "PR28",
          "question": "Si 100 g de spaghetti coûtent 2 UM, combien coûtent 250 g ?",
          "answers": ["5 UM", "4.5 UM", "5.5 UM"],
          "correctAnswer": "5 UM",
          "explanation": "Le coût augmente proportionnellement au poids. Pour 250 g : (250 / 100) x 2 UM = 5 UM."
      },
      {
          "id": "PR29",
          "question": "Un mur peut être peint par 3 peintres en 6 heures. Combien de temps prendrait le même travail pour 4 peintres ?",
          "answers": ["4.5 heures", "5 heures", "4 heures"],
          "correctAnswer": "4.5 heures",
          "explanation": "Avec plus de peintres, le temps nécessaire diminue. Le temps est inversement proportionnel au nombre de peintres, donc pour 4 peintres : (3 x 6) / 4 = 4.5 heures."
      },
      {
          "id": "PR30",
          "question": "12 litres d'eau remplissent 60% d'un seau. Quelle est la capacité totale du seau ?",
          "answers": ["20 litres", "18 litres", "24 litres"],
          "correctAnswer": "20 litres",
          "explanation": "Si 12 litres correspondent à 60%, la capacité totale est de 12 / 0.6 = 20 litres."
      }
  ]
  
     return (
         <div>
           <QCMComponent questions={te} />
         </div>
       );
     };
    export default ExamenQCM;