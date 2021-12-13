<!-- Changer le numéro de l'itération plus bas pour chaque rapport -->
# Rapport Itération numéro 2

## Identification des membres de l'équipe

Assurez-vous d'utiliser toujours le même compte GitHub pour accéder à ce projet.

## Membre 1

- <nomComplet1>Anna Andersen</nomComplet1>
- <courriel1>anna.andersen.1@ens.etsmtl.ca</courriel1>
- <codeMoodle1>AQ80740</codeMoodle1>
- <githubAccount1>aandersen-mal</githubAccount1>

## Membre 2

- <nomComplet2>Thomas Beetz</nomComplet2>
- <courriel2>Thomas.beetz.1@ens.etsmtl.ca</courriel2>
- <codeMoodle2>AP59120</codeMoodle2>
- <githubAccount2>Thomas-Beetz-Knowledge</githubAccount2>

## Membre 3

- <nomComplet3>Nick-Karl Chao</nomComplet3>
- <courriel3>nick-karl.chao.1@ens.etsmtl.ca</courriel3>
- <codeMoodle3>AQ18340</codeMoodle3>
- <githubAccount3>n3chao</githubAccount3>

## Membre 4

- <nomComplet4>Lucas Schwing</nomComplet4>
- <courriel4>lucas.schwing.1@ens.etsmtl.ca</courriel4>
- <codeMoodle4>AR77560</codeMoodle4>
- <githubAccount4>Lukip2603</githubAccount4>

## Membre 5

- <nomComplet5>Shi Yao Wang</nomComplet5>
- <courriel5>shi-yao.wang.1@ens.etsmtl.ca</courriel5>
- <codeMoodle5>AQ87340</codeMoodle5>
- <githubAccount5>syw1-art</githubAccount5>

<!-- Enlever les sections membres non utilisées -->


## Exigences

> Liste des exigences et personnes responsables de celles-ci.

| Exigence | Responsable                                |
| -------- | ------------------------------------------ |
| CU01c    | Anna Andersen, Lucas Schwing               |
| CU02b    | Nick-Karl Chao, Lucas Schwing              |
| CU02c    | Shi Yao Wang, Thomas Beetz                 |
| CU02d    | Shi Yao Wang, Nick-Karl Chao       |


## Modèle du domaine (MDD)

![MDD](modeles/mdd_sgb_sga/MDD_SGB_SGA.svg)


## Diagramme de séquence système (DSS)

> Un seul DSS sera choisi et corrigé par l'auxiliaire d'enseignement

>>CU01c

![DSS_CU01c](modeles/CU01c/DSS-CU01c-RetirerCours/DSS.svg)

>>CU02b

![DSS_CU02b](modeles/CU02b/DSS-CU02b/DSS.svg)

>>CU02c

![DSS_CU02c](modeles/CU02c/DSS-CU02c-ModifierQuestion/DSS.svg)

>>CU02d

![DSS_CU02d](modeles/CU02d/DSS-CU02d-SupprimerQuestion/DSS.svg)


## Contrats

> Si vous avez choisi un cas d'utilisation nécessitant un contrat, il faut le mettre dans cette section.
> Note: même s'il y a plusieurs contrats, un seul contrat sera choisi et corrigé par l'auxiliaire d'enseignement

>>CU01c

### Opération deleteGroupeCoursChoisi(groupeCoursChoisi : String)
Postconditions
Le cours n'existe plus dans le système SGA

>>CU02b

### Opération getListeQuestion(enseignant : String)
Postconditions:
- Aucune

### Opération postQuestionSelectionne(questionSelectionne : String)
Postconditions:
- Aucune

>>CU02c

### Opération getQuestion(nomCours : string, nomQuestion : string)
Postconditions:
- Aucune

### Opération modifierQuestion(nomCours : string, nomQuestion : string, nouveauNomQuestion : string, ... (autres paramètres))
Postconditions :
-La question a été modifiée dans la banque pour le cours

>>CU02d

### Opération getQuestion(nomCours : string, nomQuestion : string)
Postconditions:
- Aucune

### Opération supprimerQuestion(nomCours : string, nomQuestion : string)
Postconditions:
- La question a été supprimée de la banque pour le cours


## Réalisation de cas d'utilisation (RDCU)

> Chaque cas d'utilisation nécessite une RDCU.
> Note: une seule RDCU sera choisie et corrigée par l'auxiliaire d'enseignement

>>CU01c

![](modeles/CU01c/RDCU-deleteGroupeCoursChoisi/RDCU.svg)

>>CU02b

![](modeles/CU02b/RDCU-getListeQuestion/RDCU%20CU02b.svg)

![](modeles/CU02b/RDCU-postQuestionSelectionne/RDCU%20CU02b.svg)

>>CU02c

![](modeles/CU02c/RDCU-getQuestion/RDCU.svg)

![](modeles/CU02c/RDCU-modifierQuestion/RDCU.svg)

>>CU02d

![](modeles/CU02d/RDCU-getQuestion/RDCU.svg)

![](modeles/CU02d/RDCU-supprimerQuestion/RDCU.svg)


## Diagramme de classe logicielle (DCL)

> Facultatif, mais fortement suggéré
> Ce diagramme vous aidera à planifier l'ordre d'implémentation des classes.  Très utile lorsqu'on utilise TDD.

![DCL](modeles/dcl/DCL.svg)


## Vérification finale

- [x] Vous avez un seul MDD
  - [x] Vous avez mis un verbe à chaque association
  - [x] Chaque association a une multiplicité
- [x] Vous avez un DSS par cas d'utilisation
  - [x] Chaque DSS a un titre
  - [x] Chaque opération synchrone a un retour d'opération
  - [x] L'utilisation d'une boucle (LOOP) est justifiée par les exigences
- [x] Vous avez autant de contrats que d'opérations système (pour les cas d'utilisation nécessitant des contrats)
  - [x] Les postconditions des contrats sont écrites au passé
- [x] Vous avez autant de RDCU que d'opérations système
  - [x] Chaque décision de conception (affectation de responsabilité) est identifiée et surtout **justifiée** (par un GRASP ou autre heuristique)
  - [ ] Votre code source (implémentation) est cohérent avec la RDCU (ce n'est pas juste un diagramme)
- [x] Vous avez un seul diagramme de classes
- [x] Vous avez remis la version PDF de ce document dans votre répertoire
- [x] [Vous avez regardé cette petite présentation pour l'architecture en couche et avez appliqué ces concepts](https://log210-cfuhrman.github.io/log210-valider-architecture-couches/#/)

