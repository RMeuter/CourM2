# TD1

**Date :** 08 septembre 2021

## Exercice 1 :

**Groupe ciblé:** Organisateur du salon de vin et l'entreprise Bacchuseo.

**Tache & But ciblé:** Trouvé l'utilisateur cible qui a plus d'influence dans l'application Bacchuseo.

**Donnée (quoi)** 
Structure des données, graph multivarié :
- Sommet : User de Bacchuseo
- Arret : échange d'avis

**Donnée dérivées :**
- Attribut qualitatif : Groupe cluster formé par l'algo de louvain,
- Attribut quantitatif : centralité des sommets (clonest calculée idpt pour chaque cluster)

**Tache à accomplir**
- Identifier les clusters,
- Identifier les personnes les plus influentes selon les clusters

## Exercice 2:
*1h13*

## Exercice 3:
Référence 14 du pdf + formule 1

## Exercice 4:
Abstraction des taches et des données
=> Mauvaise taches, mauvaise strcuture données dérivé inutiles

Description de la visualition :
- Risque : mauvais idiomes visuels, mauvaises interactions
- précautions : justifier vos choix à l'aide
    - des regle de sémio graph
    - regles evoqué pdt le cours de viz
    - Nombeurses etudes dispo dans la littérateur

Etapes 4 : Conceptions des algo
- Risque : algo trop lent ou faux
- Précausion : 
    - Calculer complexité temps
    - Prouver que vos algo permet d'obtenir les résultat escomptés

=> Reprise à 0

## Exercice 5 :
Générez des jeux de tests
- Graphes synthétiques avec différentes structures (aléatoire, sans échelles, petit-monde, ...)
- Graph synthétique des diff tailles (nombre de sommets et d'arretes)
- graph réels

Définissez des critère de qualité 
- Distannce 2D entre u etv proportionnelle à la distance du plus court chemine entre u et v dans le graphes
- Distance moyenne 2D intra cluster < Distance moyenne 2D intercluster

Lancez votre algo de sur les diff graph et observez
- le temps de calcul (est il assez rapide pour maintenir l'intéractivité de votre outil ?)
- La qualité des résultats (via les criètre définis mais aussi via une analyse visuelle, au cas où les critères ne capturent pas toutes les propriétés du rendu final)


## Exercice 6:
Faire le "Carré latin" pour avoir une étude qui fait toutes les suites afin d'éviter les biais.

=> 26'
