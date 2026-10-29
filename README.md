# Orbit · Présentation pour BEYOND THE LINE Africa

Conception et développement : **Eldo**.

Une présentation de 24 scènes en six actes, prévue pour 52 minutes hors questions et réponses. Elle reprend les captures et l’univers établis dans la première version de SALT, avec de nouvelles compositions, un moteur de transitions à ressort et un tutoriel en cinq étapes.

En ligne : https://eldoradodesign1.github.io/orbit-presentation/

Orbit Design System : https://eldoradodesign1.github.io/orbit-presentation/orbit-design-system/

## Présenter

- Flèches gauche/droite : navigation. Début/Fin : première/dernière slide.
- O ou S : sommaire. F : plein écran. Q : objections en réserve.
- P ou N : ouvre une **fenêtre présentateur distincte**, avec notes, aperçu, prochaine slide et minuteur. Garder cette fenêtre sur l’écran du présentateur et projeter l’onglet principal.
- Le chronomètre démarre manuellement et peut être mis en pause ou réinitialisé.
- Les captures s’agrandissent au clic.
- L’icône d’ambiance ouvre les six thèmes et la réduction des mouvements.
- Sur mobile : glisser horizontalement pour changer de slide. Le contenu long se parcourt verticalement.

La présentation est statique et ne dépend d’aucune API. Aucun identifiant ni clé IA n’est nécessaire pour la consulter. Le mode présentateur synchronise deux fenêtres du même navigateur et de la même origine via BroadcastChannel. Une projection sur un autre appareil n’est pas une diffusion à distance synchronisée.

## Les six actes

| Acte | Slides | Durée |
| --- | --- | --- |
| Le constat | 1 à 3 | 5 min |
| La découverte | 4 à 8 | 10 min |
| En situation | 9 à 13 | 15 min |
| La prise en main | 14 à 18 | 10 min |
| Le modèle économique | 19 à 21 | 8 min |
| L’adoption | 22 à 24 | 4 min |

Les objections restent dans un panneau séparé et ne prolongent pas le parcours principal.

## Simulateur de la slide 21

Réglages en direct : campagnes par mois, prix Orbit par campagne, prix de l’option IA, part des campagnes avec IA, nombre de mois de rodage, rodage offert ou à moitié prix.

Les coûts avancés se règlent séparément : développement, adaptation, hébergement, réserve support et coût IA. Le graphique et le détail mensuel emploient le même modèle. Les coûts continuent pendant les mois de rodage. Le tarif de rodage s’applique au forfait Orbit et à l’option IA. Le mix IA est une moyenne attendue, sans arrondi systématique à chaque mois.

Hypothèses de départ : 2 campagnes par mois, 500 $ par campagne, 200 $ d’option IA, 50 % de campagnes avec IA, 2 mois de rodage offerts. Développement 500 $, première adaptation incluse, puis 100 $ par campagne supplémentaire. Hébergement 50 $/mois, réserve support 50 $/mois et consommation IA 20 $ par campagne équipée.

Sur 12 mois, ce scénario donne 12 000 $ facturés, 4 240 $ de coûts modélisés et un solde estimé de 7 760 $. Équilibre au mois 4. Ces hypothèses ne sont pas des ventes acquises ni des devis fournisseurs. Le solde reste avant fiscalité, frais commerciaux et effets des délais d’encaissement.

## Sources et statut des exemples

- Application : `eldoradodesign1/btl-deployment-report`, commit `3a82e5153bc50807540b53f6d91ef02dfadb727f`.
- Première présentation : commit `cd91d08` du présent dépôt. Captures, logo et héros conservés comme base.
- Palettes : `app/client/src/orbit/orbit.css` de l’application.
- Parcours et fonctions : `AskCampaign.tsx`, `ClientAccess.tsx`, `ReportExportV2.tsx`, `LocalLogin.tsx` et les vues de l’application.
- Les captures montrent l’interface réelle du 29 octobre 2026. Les données affichées ne constituent pas un bilan audité.
- Capture de la fenêtre IA ajoutée sans envoyer de requête.
- Photographies de réunion, de terrain et de bureau : mises en situation générées par IA. Le visuel terrain ne reproduit pas une capture exacte de l’interface.
- Conversation IA et signal du point Est : **exemples fictifs** identifiés dans la présentation.
- Les tarifs sont des propositions d’Eldo. Le pilote sert à mesurer les gains et à tester l’acceptation commerciale.

Le quota actuel d’Orbit est journalier par navigateur client ou compte BTL. Un comptage par client et campagne doit être réceptionné avant une facturation commerciale au quota. La présence d’écrans de droits ne remplace pas un test des contrôles serveur, de l’isolement des clients et des sauvegardes.

## Développement et vérification

Aucune étape de compilation. GitHub Pages sert la racine avec `.nojekyll`.

- `node scripts/model.test.cjs` vérifie les scénarios financiers, le rodage, le mix IA et 108 combinaisons.
- `orbit-design-system/` contient les tokens, composants de matière, moteur de mouvement et documentation.
- `slides.js` contient le parcours, les notes et les durées.
- `render.js` contient les compositions.
- `deck.js` gère navigation, gestes, thèmes, fenêtres et interactions.

Le code et les données de l’application principale n’ont pas été modifiés par cette livraison.

By Eldo.
