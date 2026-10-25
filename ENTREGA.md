# ENTREGA 

 ## Evidencia de que OpenSpec está operativo 
 ```
 juanpabloaljure@Juans-MacBook-Pro ai4devs-openspec-sandbox-202606-sr-2 % openspec --version
1.4.1

juanpabloaljure@Juans-MacBook-Pro ai4devs-openspec-sandbox-202606-sr-2 % ls -R openspec/
changes         config.yaml     specs

openspec//changes:
archive

openspec//changes/archive:

openspec//specs:
```

## Plantilla de los 3 Pilares
*Micro-tarea:* Add a function to validate an email format
*Pilar 1 — Herramienta:* ¿Cuál eliges? simple regex, and native assert for validation
 ¿Por qué esta y no otra? Sin dependencias, rápido
*Pilar 2 — Contexto:* ¿Qué información estás aportando? (lenguaje, framework, restricciones, ejemplos…) javascript 
 ¿Hay algo del contexto que has decidido omitir conscientemente? dont use imports
*Pilar 3 — Prompt:* ¿Cómo lo estructuras? (estilo, formato de salida, ejemplos…)
 Pega aquí el prompt final que vas a lanzar.
 Add a function to validate an email format
 Use simple regex, dont use imports
 The function validateEmail should be in a file call tools and return true or false
 Make the unit tests on validate.test.js file and cover the next scenarios
 Valid:
 "test@example.com"
 "user.name@domain.co.uk"
 "john+filter@company.com"

invalid:
"test" (no @)
"test@" (no domne)
"@example.com" (no usuer)
"test@.com" (no domine name)
"test@@example.com" (double @)
"test @example.com" (blank space)
"test@example" (no TLD)

*Resultado:* ¿Funcionó a la primera o tuviste que iterar?
 Sí, funcionó a la primera. Los 10 test cases pasaron sin necesidad de iteración.
 Output: Passed: 10 | Failed: 0
 
 Una mejora que harías si volvieras a hacerlo.
 El regex actual es suficiente para la mayoría de casos, pero regex puro tiene límites.
 Agregar más tests para caracteres especiales válidos (dots, hyphens, underscores).

## Observaciones
1. Division entre specs y commandos
2. No entiendo muy bien changes y archive
3. Cual sera la diferencia entre skill y command
