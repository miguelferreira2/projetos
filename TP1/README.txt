NOTAS: 

O código não funciona com diretorias/ficheiros cujo nome apresenta o caracter " " (espaço).

Geração do ficheiro JAR:

- Executar na diretoria pertinente o comando "java *.java";

- Uma vez que a função main não está a ser identificada automaticamente e o projeto possui classes anónimas (pela criação e chamada direta de algumas threads), deve criar-se um ficheiro "manifest.txt" com o conteúdo "Main-Class: <nome da class que possui o método main>", seguido de um "\n", e proceder-se ao seguinte comando:

jar --create --verbose --file <nome do jar>.jar --manifest=manifest.txt <todas as classes geradas pelo comando "java *.java" separadas por " ">

onde as classes anónimas geradas devem apresentar um "/" antes do "$". Exemplo: MainServer$1.class -> MainServer\$1.class

Instruções: ----------//----------//----------

-> Abrir 1 terminal para correr o servidor principal, na diretoria "/MainServer";

-> Abrir 1 terminal para correr o servidor secundário, na diretoria "/BackupServer";

-> Abrir 1 ou mais terminais para correr o cliente, na diretoria "/Client";

-> Compilar os ficheiros java, caso não estejam já compilados. No caso de ficheiros .jar, devem ser corridos nas diretorias acima referidas, respetivamente;

-> Iniciar apenas 1 dos servidores ("java MainServer" ou "java BackupServer", mas, de um ponto de visto lógico, faz sentido iniciar primeiro o MainServer) e aguardar que mostre a mensagem "Estou a iniciar como principal";

-> Opcionalmente, iniciar o servidor secundário ("java MainServer" ou "java BackupServer", mas, de um ponto de visto lógico, faz sentido iniciar agora o BackupServer) e aguardar que mostre a mensagem "Vou iniciar como secundário".

-> Depois, iniciar o cliente ("java TCPClient"). Imediatamente, se se conseguir conectar, irá mostrar "Insira o nome de utilizador e a palavra-passe:". Aí, deve-se inserir um nome de utilizador válido, assim como a password associada, da seguinte forma: "<utilizador> <password>". 

-> Após o login bem sucedido, é mostrada a mensagem "Login efetuado com sucesso!" e a consola é "desbloqueada", sendo agora possível enviar comandos para o servidor.

Comandos Cliente: ----------//----------//----------

sls -> listar ficheiros da diretoria atual no servidor
sls -all -> lista todos os ficheiros dentro da pasta do utilizador no servidor

scd -> mostrar o path atual no servidor
scd <path> -> ir para a diretoria <path> no servidor
scd . -> ir para a diretoria "home" da pasta do cliente no servidor

ls -> listar ficheiros da diretoria atual no cliente
ls -all -> lista todos os ficheiros dentro da pasta do utilizador no cliente

cd -> mostrar o path atual no cliente
cd <path> -> ir para a diretoria <path> no cliente
cd . -> ir para a diretoria "home" da pasta do cliente no cliente

ps -set <password> -> alterar password

main -set <endereço> <porto> -> definir endereço IP e porto para o servidor principal
backup -set <endereço> <porto> -> definir endereço IP e porto para o servidor secundário
main -> mostra endereço IP e porto para o servidor principal
backup -> mostra endereço IP e porto para o servidor secundário

sendfile <nome> -> envia uma copia de um ficheiro da diretoria atual do cliente para a diretoria atual do servidor. 
getfile <nome> -> envia uma copia de um ficheiro da diretoria atual do servidor para a diretoria atual do cliente. 