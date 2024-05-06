# tesina-test

Este es un repositorio creado con el fin de realizar una evaluacion sobre los frameworks desarollados para la tesina de grado denominada "Normalizacion e Identificacion de objetos duplicados sobre contenido extraido de la web".

El objetivo es evaluar la usabilidad de los frameworks para cada participante a traves de una guia que se les brindara a continuacion. Luego de haber realizado las tareas solicitadas se les realizara un conjunto de preguntas para evaluar la experiencia de uso.

En primer lugar contamos con un framework desarrollado para normalizar objetos json extraidos de la web. Estos objetos se encuentran en un dataSet que aqui se brinda y fueron extraidos a traves de una herramienta de scrapping denominada WOA. Esta herramienta nos permite extraer informacion de la web para poder estructurar y darle sentido a una informacion que estaba esparcida y carecia de significado. Cada objeto extraido representa un objeto de tipo 'mobilePhone' perteneciente a la DBpedia. Todos los objetos cuentan con la misma estructura de datos, y teniendo en cuenta que al momento de realizar la extraccion de los mismos, estos pueden contener basura, datos innecesarios o mal formados, es necesario realizar una limpieza o normalizacion de los mismos. Esto se realizara a traves del framework de normalizacion. Normalizar un objeto implica normalizar cada uno de sus campos, por lo que es necesario definir y aplicar una estrategia de normalizacion en particular sobre cada uno de ellos. Este framework se encuentra dentro del directorio 'normalizer' y cada participante debera extenderlo creando nuevos normalizadores para poder aplicar sobre cada uno de los campos de los objetos. De esta manera buscamos realizar una transformacion de datos para obtener una fuente lo mas limpia posible.

Luego de ello deberemos procesar el archivo obtenido a traves del siguiente framework con el fin de obtener aquellos objetos candidatos a duplicados, es decir aquellos que se correspondan al mismo objeto en la vida real. Aqui la tarea sera similar a la anterior, es decir, se debera extender el framework pero en este caso creando comparadores de similitud de datos, tanto para un campo en particular como para un objeto entero. La finalidad aqui es, a traves de un objeto tomado como referencia, obtener aquellos objetos candidatos a duplicados.

A continuacion se presenta una guia para que usted pueda realizar las tareas solicitadas, y al finalizar se le realizara una serie de preguntas para evaluar la experiencia de uso.

En primer medida es necesario clonar el repositorio a traves del comando:

    git clone https://github.com/gonmastronardi/tesina-test

Luego nos moveremos hasta el directorio /normalizer donde se encuentra el framework de normalizacion y ejecutaremos el comando 'npm install' para instalar las dependencias correspondientes.

![Diagrama de clases](/normalizer/images/ClassDiagram-Normalizacion.drawio.png)

El framework de normalizacion cuenta con dos Clases principales, ellas son:

    ObjectNormalizer y FieldNormalizer

La clase ObjectNormalizer sera la que debamos instanciar para invocar los metodos principales del framework, que son:

    + normalizeObject(anObject)
    + normalizeObjectsInMap(aMapOfObjects)

El primero para normalizar un unico objeto y el segundo para normalizar una coleccion de los mismos. 

La clase FieldNormalizer funciona como una interface sobre la cual las diferentes estrategias de normalizacion deberan extender para reimplementar el metodo:

    +normalize()

el cual tendra la logica correspondiente segun la estrategia elegida.

Estas estrategias concretas son las que debemos instanciar a traves de un archivo de configuracion para poder aplicar sobre cada uno de los campos de los objetos. 

A continuacion se muestra un ejemplo de como extender el framework a traves de la creacion de una estrategia de normalizacion especifica para aplicar sobre el campo precio. Esta clase extendera de la interface FieldNormalizer y redefinira su propio metodo normalize() pasando a formar parte del framework.

```javascript
import FieldNormalizer from "./FieldNormalizer.js";

export default class MonetaryAmountNormalizer extends FieldNormalizer {
  
  normalize(anObject, attribute) {
    // code here
   // method already developed
   // see in file
  }

}
```
![Diagrama de clases 2](/normalizer/images/ClassDiagram-Normalizacion.drawio-2.png)

De esta manera creamos un nuevo normalizador y sera la misma tarea la que el programador deba realizar para crear la estrategia de normalizacion correspondiente segun la necesidad propia.
Una vez que tenemos el normalizador creado lo insertaremos dentro del archivo Normalizers.js el cual contiene un listado de los normalizadores ya creados para poder accederlos luego desde el archivo de configuracion.

Luego de tener definidas la estrategias a aplicar para cada campo y que cada una se encuentre desarrollada sera momento de setear la configuracion. Esto se realizara en un archivo llamado config.js y a traves de una variable de tipo diccionario indicaremos en pares de datos clave:valor el campo a normalizar y la estrategia a aplicar. 


```javascript
import normalizers from '../classes/Normalizers.js'

//configuration for each field of the JSON object to normalize
var configuration = {
    price:  new normalizers.MonetaryAmountNormalizer()
    //rest of fields
};

export default configuration;
```
Esta configuracion luego sera importada desde el archivo index.js y enviada como parametro al objeto ObjectNormalizer al momento de su instanciacion.

Una vez lista la configuracion y para poder utilizar framework crearemos un archivo index.js sobre el cual instanciaremos un ObjectNormalizer con la configuracion elegida. Aqui importaremos esta configuracion para enviarla al momento de instanciar un nuevo ObjectNormalizer. El programador desarrollara dentro de este archivo la logica necesaria segun sus necesidades. En el siguiente ejemplo se crea un unico ObjectNormalizer y luego se invocara al metodo normalizeObjectsInMap(), al cual se le enviara el dataset que se encuentra en este repositorio. 

```javascript
import jsonfile from "jsonfile";
import ObjectNormalizer from "./classes/ObjectNormalizer.js";
import configuration from './common/config.js';

const inputFile  = process.argv[2];
let outputFile = process.argv[3];


//creates an ObjectNormalizer with the previous configuration
const normalizer = new ObjectNormalizer(configuration);

//reads the input file and it calls normalize method from ObjectNormalizer 
jsonfile
  .readFile(inputFile)
  .then(result => normalizer.normalizeObjectsInMap(result))
  .then(result => jsonfile.writeFile(outputFile, result))
  .catch(err => console.error(err));

```

Aqui podemos observar que a traves de la constante 'inputFile' se almacena el dataSet o el objeto a normalizar recibido como parametro, y en segunda instancia a traves de la variable 'outputFile' indicamos la ruta del archivo resultante. Cabe aclarar que desde el archivo index.js es probable recibir mas de un parametro, crear multiples instancias normalizadoras e importar multiples configuraciones para poder definir la logica deseada. En este caso recibimos una unica coleccion de objetos e invocamos al metodo que normaliza todos ellos.

La invocacion al index.js desde la linea de comandos quedaria de la siguiente manera

    node index.js /ruta/al/directorio/dataSet.js /ruta/al/archivo/resultado.js

Con este resultado finaliza la primera etapa y obtendremos el archivo con los campos de los objetos normalizados. 
En la siguiente etapa nos enfocaremos en la busqueda o identificacion de aquellos objetos candidatos a duplicados, es decir, aquellos objetos que se correspondan al mismo objeto en la vida real. Para ello contaremos con la ayuda del framework de identificacion de duplicados el cual se encuentra dentro del directorio /comparator. Al igual que con el framework anterior sera necesario instalar sus dependencias a traves del comando npm install.

Este segundo framework nos servira para, a traves de un objeto tomado como referencia, identificar sus potenciales candidatos a duplicados. 

Aqui se presenta la estructura del framework

![Diagrama de clases comparator](/comparator/images/ClassDiagram-Duplicados.drawio-2.png)

El framework nace a partir de la clase ObjectSimilarityCalculator, su clase base, la cual cuenta con los metodos principales getSimilarityMap y getSimilarity. A traves del primero se recorrera una coleccion de objetos y se ira comparando el objeto candidato con sus pares a traves del metodo getSimilarity. Este ultimo debera ser reimplementado por las clases ComposedObjectSimilarityCalculator y SimpleObjectSimilarityCalculator. 
La clase ComposedObjectSimilarityCalculator sera de utilidad para comparar dos objetos compuestos entre si, es decir que tengan mas de un campo, mientras que la clase SimpleObjectSimilarityCalculator funciona como hoja y la utilizaremos para comparar los campos simples de los objetos a traves de una estrategia en particular. Ambas clases debemos extenderlas para definir el metodo getSimilarity. Se invocara al metodo getSimilarity de la clase SimpleObject si se trata de un campo simple, o al metodo getsimilarity de esta misma clase si se trata de un campo compuesto. Cada campo puede contener un dato simple, por tanto se invocara al metodo getSimilarity de la clase simple, o bien puede contener un campo compuesto, es decir, que contenga dos o mas campos simples. Entonces en ese caso se invocara al metodo metodo getsimilarity de esta misma clase. Esto nos permitira generar estructuras en forma de arbol.

Por lo tanto, a traves de la clase SimpleObjectSimilarityCalculator crearemos nuevas clases que extiendan de ella para redefinir el metodo getSimilarity y crear nuevas estrategias de comparacion de campos, las cuales deberan retornar un valor entre 0 y 1 para cada campo. Este representa el primer punto de extension del framework.
Por otro lado, a traves de la clase ComposedObjectSimilarityCalculator aparece el segundo punto de extension del framework donde el programador debera definir un metodo de integracion a traves de la creacion de una clase que extienda de ella y redefina elmetodo integrate. De esta manera podremos obtener el valor de similitud final entre dos objetos.

Entonces aqui el objetivo sera extender el framework creando una o varias estrategias de similitud para cada campo redefiniendo el metodo getSimilarity de la clase SimpleObject, y a su vez crear una clase que extienda de ComposedObject y redefina el metodo integrate para definir una nueva estrategia de integracion. 

La instanciacion del framework se realizara a traves de las clases concretas que extiendan de ComposedObject, enviando como parametro una configuracion en donde se indicara para cada campo que estrategia de comparacion utilizar. Como se menciono previamente un campo puede ser compuesto por lo que una nueva instanciacion de un objeto compuesto debera crearse indicando dentro una nueva configuracion con las estrategias particulares.

A continuacion se muestra un ejemplo de como utilizar ambos puntos de extension a traves de la creacion de nuevas clases junto a la definicion de una configuracion en particular para poder instanciar y usar framework.

En primer instancia crearemos una clase denominada 'JaroWinkler' que extendera de SimpleObjectSimilarityCalculator y definira su propio metodo getSimilarity.

```javascript

import SimpleObjectSimilarityCalculator from "../SimpleObjectSimilarityCalculator.js";
import jaroWinklerSimilarity from 'jaro-winkler';


export default class JaroWinklerSimilarityCalculator extends SimpleObjectSimilarityCalculator {
  constructor() {
    super();
  }

  /**it receives 2 strings and returns a similarity value between 0 and 1
   * helped by an external library that uses Jaro-Winkler distance.
   */
  async getSimilarity(aString, anotherString) {
    if (((aString&&anotherString)!== undefined)){
      //do stuff if query is defined and not null
      return jaroWinklerSimilarity(aString,anotherString)
    } else {
      return 0
    }
  }
};


```

En este caso utilizaremos una libreria externa de ayuda la cual invocaremos enviandole dos strings para poder calcular el valor de similitud a traves del algoritmo de Jaro-Winkler, el cual nos retornara un valor entre 0 y 1. Luego podremos agregar esta clase al archivo fieldComparators.js el cual contendra todos los metodos de comparacion de campo para luego poder invocarlos al momento de definir la configuracion. 
De esta manera hemos definido una nueva clase que extienda de SimpleObject y asi es como podemos definir diferentes estrategias de comparacion de campo. 

Lo siguiente es definir una estrategia de integracion para asi poder calcular el valor de similitud final de un objeto en base a los valores obtenidos para cada campo. Para ello es necesario definir una clase que extienda de ComposedObject y redefina el metodo 'integrate'. A continuacion se muestra como

```javascript

import ComposedObjectSimilarityCalculator from "../ComposedObjectSimilarityCalculator.js";

export default class AverageSimilarityCalculator extends ComposedObjectSimilarityCalculator {
  constructor(aConfiguration) {
    super(aConfiguration);
  }

  integrate(aMap) {
    let totalFieldsValue = 0;
    let quantityOfFields = 0;
    for (var key in aMap) {
      if (aMap[key] != null){
        totalFieldsValue += aMap[key];
        quantityOfFields++;
      }
    }

    return totalFieldsValue / quantityOfFields;
  }
};


```

Aqui en la clase AverageSimilarityCalculator definimos el metodo integrate, el cual calculara la suma de aquellos campos que contengan algun valor y calculara el el promedio de ellos para obtener el valor de similitud final del objeto. De este modo podremos crear nuevas clases que extiendan de ComposedObject para definir nuevas estrategias de integracion. 

Asi se calculara el valor de similitud para cada objeto y dependiendo el umbral que el programador defina sera tenido en cuenta o no como objeto candidato a duplicado. 

Por lo tanto, luego de que tenemos definidas las estrategias de comparacion para cada campo y ya contamos con una estrategia de integracion podemos pasar a definir la configuracion en donde indicaremos que estrategia usar en cada campo. A continuacion se muestra un ejemploo:

```javascript

import fieldComparators from "../src/classes/fieldStrategies/fieldComparators.js";

var configuration = {
    name: fieldComparators.jaroWinklerSimilarityCalculator,
    storageMemory: fieldComparators.jaroWinklerSimilarityCalculator,
    mainCamera: fieldComparators.jaroWinklerSimilarityCalculator,
    price: fieldComparators.jaroWinklerSimilarityCalculator,
  };

  export default configuration;

```

En el archivo config.js definimos la configuracion e importamos la clase fieldComparators.js a traves de la cual podemos invocar a los metodos de comparacion. En este caso al ser un ejemplo utilizaremos el mismo metodo para todos los campos. El objetivo es definir nuevos y poder invocar diferentes metodos desde aqui.

Esta configuracion sera enviada como parametro al momento de instanciar el framework a traves de las clases concretas dependiendo el metodo de integracion que se quiera utilizar. En este caso instanciaremos el framework a traves de clase AverageSimilarityCalculator.

```javascript

import configuration from "./common/config.js";

const averageSimilarityCalculator = new AverageSimilarityCalculator(
  configuration
);

```

Importamos la configuracion desde el archivo index.js y la enviamos al constructor.

Finalmente la manera de ejecutar la aplicacion a traves de la linea de comandos sera de la siguiente manera:

    node index.js param1 param2 param3 param4

en donde:

    param1: ruta al archivo de entrada

    param2: objeto tomado como referencia a comparar con los demas, el cual puede ser un objeto o bien un valor numerico el cual indicara la posicion del objeto en el archivo param1

    param 3: ruta al archivo de salida

    param4: valor o umbral por el cual filtraremos los objetos cuyo valor de similitud sea mayor o igual al indicado.

