# Orbit Design System · v1.0

Par Eldo pour BEYOND THE LINE Africa.

Ce kit formalise le langage visuel de l’application Orbit. Les six palettes proviennent de `app/client/src/orbit/orbit.css` dans `eldoradodesign1/btl-deployment-report`, commit `3a82e5153bc50807540b53f6d91ef02dfadb727f`. Les composants et le moteur de mouvement sont réutilisables sans framework. La présentation en est le premier consommateur. L’application principale n’a pas été modifiée par cette livraison.

## Intégration

Charger `tokens.css`, puis `materials.css`, puis `motion.js`. La racine utilise `data-ambiance="aurore"`. Autres valeurs : `nebuleuse`, `pulsar`, `blackhole`, `starfly`, `aube`.

Couleurs : variables `--o-*` avec canaux RVB, à employer sous la forme `rgb(var(--o-acc))`. Rôles : deep0/fond, deep1/surface, deep2/profondeur, ink/texte principal, ink2/texte secondaire, acc/action, coral/signal contextuel.

Matières : `.ods-glass`, `.ods-button`, `.ods-button.secondary`, `.ods-pill`, `.ods-dot`, `.ods-segmented` et `.ods-range`. Les boutons segmentés exposent `aria-pressed`. Un curseur expose son libellé et sa valeur.

## Règles de composition

- Une idée forte par écran, puis une preuve ou une interaction utile.
- Titre de 40 à 84 px sur grand écran. Chasse négative aux grandes tailles. Corps 17 à 24 px, interligne 1.5 environ.
- Espaces de référence 8, 16, 24, 40 et 64 px. Rayons 12, 22 et 32 px.
- Un niveau de verre par groupe. Les grandes surfaces restent plus denses que les éléments décoratifs.
- L’accent indique une action ou un résultat. Les captures et les données gardent leur identité.
- Une image de mise en situation reste identifiable comme illustration. Un scénario chiffré reste identifiable comme fictif.

## Mouvement

`new OrbitMotion.Spring({ x: 0 }, (v) => { /* appliquer v.x */ })`.

- `.to({x:100})` retargete le ressort depuis sa valeur et sa vitesse visibles.
- `.snap({x:0})` place immédiatement et réinitialise la vitesse.
- `.stop()` suspend le mouvement.
- Référence : réponse 0.34 s, amortissement 1.0, sans rebond décoratif.
- Passer la vitesse du geste à `spring.velocity.x` avant `.to()` pour la continuité au lâcher.
- Pas de navigation verrouillée pendant les transitions. Pas de boucle d’animation plein écran.
- `prefers-reduced-motion` et `data-reduce="true"` donnent des transitions immédiates. Le verre respecte `prefers-reduced-transparency` et `prefers-contrast`.

## Vérification

Tester chaque ambiance, la navigation rapide dans les deux sens, les éléments au clavier, les petits écrans, les grandes valeurs et les préférences d’accessibilité. Un thème clair n’est pas un simple filtre appliqué aux captures.
