## Running portable build enviroment.

How to develop front-end project with webpack inside a docker container using boot2docker on windows

### The main aim of using docker for development is:

*  *Portable build environment* 
*  *Simplified on-boarding of new developers*
*  *Consistency between development and continuous integration (CI)*

In summary tools like docker make it very easy to package up a development environment and share it among a team of developers

## Steps to run

* *Docker Toolbox Instalation*
* *Start "Docker Quickstart Terminal"*
* *Create a new docker machine*
* *Create a new docker image*
* *Run a new created docker image*

## Docker Toolbox Instalation

[Get Docker Toolbox] (https://download.docker.com/win/stable/DockerToolbox.exe) in order to install all needful tools.
Run the installation wizard as administrator (Right click the DockerToolbox.exe > Run as administrator).

### What you get in this step
* Docker CLI client for running Docker Engine to create images and containers
* the Docker QuickStart shell preconfigured for a Docker command-line environment
* Oracle VM VirtualBox

### Start "Docker Quickstart Terminal" 

* Go to Windows and run **Docker Quickstart Terminal**
It will be run the terminal window and run all initial steps to prepare Vm enviroment to work with. 

*Issue with VT-x:*
```
The system can print you with sort of message what VT-x is not anabled, in such case go to Bios, and turn on VT-x mode.
```
*Stuck with boot2docker.iso downloading :*
[boot2docker.iso](https://github.com/boot2docker/boot2docker/)
```
You should take image and place it to the user/username/.docker/machine/cache folder, after start terminal again.
```
After y has had the fully initialized terminal with promt to ready to work, you need create the default docker mashine 

### Create a new docker machine
Now y need working in terminal.
1. Check whether there is an active docker machine by running the below command:

    $ docker-machine active
    
    if in the output list y will have one, just remove it with next command:
    
    $ docker-machine rm default
2. Create a new machine 
    
    docker-machine create --driver virtualbox --engine-env HTTP_PROXY=http://proxy:8080 --engine-env HTTPS_PROXY=http://proxy:8080 default
 
### Buld a new docker image

In order to build this Dockerfile and get the Docker image, you need pefrom next steps

1. Within Terminal go to project root folder what you downloaded. It should have Dockerfile what cover rulls to build contaner what fit your app needs.

    ```
    $docker build –t <container name> .  - <container name> should make sence to project what y run, but can be what ever you prefer. 
    ```
This creates an image with the “tag” (or name). And now we can use this tag to run a container of our application:

### Run a new created docker image

1. Run the default application  
    ```
    docker run -it --rm -p 3000:3000 --name app-1 <name>
    ```
    You can test it by visiting http://container-ip:3000 in the brouser
    
2. Run application with mapping to src folder on your host, to have ability working with code but to buid will be produce within created container.
    ```
    docker run -it --rm -v '//c/Users/username/<path to you progect src folder>:/usr/src/app/src' -p 3000:3000 --name app-1 <container name>
    ```

* docker run - This is the Docker command that runs a container from an image. There are dozens of options you can set when using the docker run command, but we've used a bare minimum set to get started
* --rm - By default, Docker runs a container's command and then shuts the container down, but instead of deleting it, Docker keeps that container around in case it's needed later. Because we don't want to re-run this container, we've set the --rm flag. This saves space and is generally a good practice for one-off scripts like this.