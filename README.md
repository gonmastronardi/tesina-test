# tesina-test

Este es un repositorio creado con el fin de realizar una evaluacion sobre los frameworks desarollados para la tesina de grado denominada "Normalizacion e Identificacion de objetos duplicados sobre contenido extraido de la web".

El objetivo es evaluar la usabilidad del framework por cada participante a traves de una guia que se les brindara a continuacion. Luego de haber realizado las tareas solicitadas se les realizara un conjunto de preguntas para evaluar la experiencia de uso por cada participante.

En primer lugar contamos con un dataSet con objetos json extraidos de la web. Cada objeto representa un telefono celular extraido de una pagina web en particular. Todos los objetos cuentan con la misma estructura de datos, pero al momento de realizar la extraccion de los mismos, estos pueden contener basura, datos innecesarios o mal formados. El objetivo aqui es realizar una limpieza o normalizacion de datos a traves del framework de normalizacion. Normalizar un objeto implica normalizar cada uno de sus campos, por lo que es necesario definir y aplicar una estrategia de normalizacion sobre cada uno de ellos. 
Este framework se encuentra dentro del directorio 'normalizer' y cada participante debera extenderlo creando nuevos normalizadores para poder aplicar sobre cada uno de los campos de los objetos. De esta manera buscamos realizar una transformacion de datos para obtener una fuente lo mas limpia posible.

Luego de ello debemos procesar el archivo obtenido a traves del siguiente framework con el fin de obtener aquellos objetos candidatos a duplicados, es decir que se correspondan al mismo objeto en la vida real. Aqui la tarea sera similar a la anterior, es decir, se debera extender el framework pero en este caso creando comparadores de similitud de datos, tanto para un campo en particular como para un objeto entero. La finalidad aqui es, a traves de un objeto tomado como referencia, obtener aquellos objetos candidatos a duplicados.

A continuacion se presenta una guia para que usted pueda realizar las tareas solicitadas, y al finalizar se le realizara una serie de preguntas para evaluar la experiencia de uso.

En primer medida clonamos el repositorio a traves del comando:

git clone 'ruta'

Luego nos moveremos hasta el directorio /normalizer donde se encuentra el framework de normalizacion y ejecutaremos el comando 'npm install' para instalar las dependencias correspondientes.

![Diagrama de clases](/normalizer/common/ClassDiagram-Normalizacion.png)

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

A continuacion se muestra un ejemplo de como extender el framework a traves de la creacion de un metodo de normalizacion especifico para aplicar sobre el campo precio. Esta clase extendera de la interface FieldNormalizer, redefinira su propio metodo normalize() y forma parte del framework.

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

De esta manera creamos un nuevo normalizador y sera la misma tarea la que el programador deba realizar para crear el configurador correspondiente segun la necesidad propia.
Una vez que tenemos el normalizador creado lo insertamos dentro del archivo Normalizers.js el cual contiene un listado de los normalizadores ya creados para poder accederlos luego desde el archivo de configuracion.

Luego de tener definidas la estrategias a aplicar para cada campo y que cada una se encuentre desarrollada es momento de setear la configuracion. Esto se realizara en un archivo llamado config.js y a traves de una variable de tipo diccionario indicaremos en pares de datos 'clave:valor' el campo a normalizar y la estrategia a aplicar. Esta coniguracion luego sera importada desde el archivo index.js y enviada como parametro al objeto ObjectNormalizer al momento de su instanciacion.

```javascript
import normalizers from '../classes/Normalizers.js'

//configuration for each field of the JSON object to normalize
var configuration = {
    price:  new normalizers.MonetaryAmountNormalizer()
    //rest of fields
};

export default configuration;
```

Una vez tengamos definida la configuracion y para poder utilizar framework crearemos un archivo index.js sobre el cual instanciaremos un ObjectNormalizer con la configuracion elegida. Aqui importaremos esta configuracion para enviarla al momento de instanciar un nuevo ObjectNormalizer el programador desarrollara la logica necesaria segun el caso. En el siguiente ejemplo se crea un unico ObjectNormalizer y luego se invocara al metodo normalizeObjectsInMap(), al cual se le enviara el data set que se encuentra en este repositorio. 

```javascript
import ObjectNormalizer from "./classes/ObjectNormalizer.js";
import configuration from './common/config.js';

const inputFile  = process.argv[2];
let outputFile = process.argv[3];

//creates an ObjectNormalizer with the previous configuration
const normalizer = new ObjectNormalizer(configuration);

```

aqui podemos observar que a traves de la constante 'inputFile' se recibe como parametro la ruta del dataSet o del objeto a normalizar, y en segunda instancia a traves de la variable 'outputFile' indicamos la ruta del archivo resultante. Cabe aclarar que desde el archivo index.js es probable recibir mas de un parametro, crear multiples objetos normalizadores e importar multiples configuraciones y definir la logica deseada. En este caso recibimos una unica coleccion de objetos e invocamos al metodo que normaliza todos ellos.

La invocacion al index.js desde la linea de comandos quedaria de la siguiente manera

    node index.js /ruta/al/directorio/dataSet.js /ruta/al/archivo/resultado.js

