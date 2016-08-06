angular.module('sceneDetail').component('sceneDetail', {
    templateUrl: 'static/js/app/scene-detail/scene-detail.template.html',
    controller: ['$routeParams', 'Scene', 'helperService', '$scope', 'SceneTag', 'Actor', 'Website', '$http', '$rootScope', 'scopeWatchService', '$localStorage', '$sessionStorage',
        function SceneDetailController($routeParams, Scene, helperService, $scope, SceneTag, Actor, Website, $http, $rootScope, scopeWatchService, $localStorage,
                                       $sessionStorage) {
            var self = this;
            var sceneList = helperService.get();

            var counter = 0;

            self.samplePath = "";

            var gotPromise = false;
            var askedForSample = false;

            self.next = null;
            self.prev = null;
            self.callerPage = null;
            self.selectedSceneTag = null;
            self.selectedActor = null;
            self.selectedWebsite = null;

            self.isSampleExists = false;
            self.updatedSample= true;


            $scope.$on("sceneChanged", function (event, scene) {
                console.log("scene-detail: sceneChanged was triggered. Scene is: " + angular.toJson(scene));
                self.updateScene(scene);
            });


            $scope.$on("actorSelected", function (event, selectedActor) {
                self.actor = selectedActor['selectedObject'];
                self.actorSelect(self.actor);
            });


            $scope.$on("websiteSelected", function (event, website) {
                self.website = website['selectedObject'];
                self.websiteSelect(self.website);
            });

            $scope.$on("sceneTagSelected", function (event, sceneTag) {

                self.sceneTagSelect(sceneTag['selectedObject']);
            });


            // self.currentScene;
            console.log("scene-detail: Helper service data is " + angular.toJson(sceneList));
            console.log("scene-detail: Helper service data is " + sceneList);

            self.getCurrentScene = function () {

                self.scene = Scene.get({sceneId: $routeParams.sceneId}).$promise.then(function (res) {
                self.currentScene = res.id;
                console.log("scene-detail: current id is " + angular.toJson(self.currentScene));
                self.scene = res;
                gotPromise = true;

                self.samplePath = '/media/scenes/' + res.id + '/sample/sample.mp4';
                $rootScope.title = res.name;



                scopeWatchService.sceneLoaded(res);

                self.getNext();
                self.getPrev();
            });

            };

            self.getCurrentScene();



            self.didGetPromise = function () {
                alert("gotPromise = " + gotPromise);
                return gotPromise;
            };

            self.updateScene = function (scene) {


                // if (self.scene.actors == '-1') {
                //     self.scene.actors = [];
                // }


                Scene.update({sceneId: scene.id}, scene);
            };

            self.sceneTagSelect = function (sceneTag) {
                // alert("item " +
                // angular.toJson($item) +
                // "model:" + angular.toJson($model) +
                // "lable:" + angular.toJson($label)
                //
                // );
                if (sceneTag.id != '-1') {
                    // alert("This is not a create statement");
                    var found = false;
                    for (var i = 0; i < self.scene.scene_tags.length && !found; i++) {
                        if (sceneTag.id == self.scene.scene_tags[i]) {
                            found = true;
                        }
                    }
                    if (!found) {
                        self.scene.scene_tags.push(sceneTag.id);
                        self.updateScene(self.scene);

                        scopeWatchService.addSceneTagToList(sceneTag);

                    }


                } else {

                    // alert("This is a create statment");
                    var newSceneTag = new SceneTag();
                    newSceneTag.name = sceneTag.value;
                    newSceneTag.scenes = [];
                    newSceneTag.websites = [];
                    newSceneTag.scenes.push(self.scene.id);

                    newSceneTag.$save().then(function (res) {
                        self.scene.scene_tags.push(res.id);
                        self.updateScene(self.scene);

                        res.name = sceneTag.value;
                        scopeWatchService.addSceneTagToList(res);

                    })

                }
            };

            self.websiteSelect = function (website) {

                if (website.id != '-1') {
                    // alert("This is not a create statement");
                    var found = false;
                    for (var i = 0; i < self.scene.websites.length && !found; i++) {
                        if (website.id == self.scene.websites[i]) {
                            found = true;
                        }
                    }
                    if (!found) {

                        self.scene.websites.push(website.id);
                        self.updateScene(self.scene);
                        scopeWatchService.addWebsiteToList(website);


                    }


                } else {

                    // alert("This is a create statment");
                    var newWebsite = new Website();
                    newWebsite.name = website.value;
                    newWebsite.scenes = [];
                    newWebsite.scenes.push(self.scene.id);
                    newWebsite.scene_tags = [];


                    // newActor.scenes.push(self.scene.id);
                    // alert("New actorTag name is:" + $item.value);
                    // alert(angular.toJson(newActorTag));
                    newWebsite.$save().then(function (res) {
                        self.scene.websites.push(res.id);
                        self.updateScene(self.scene);
                        scopeWatchService.addWebsiteToList(res);


                        // self.updateActor(self.actor);
                    })

                }

            };


            self.actorSelect = function (actor) {
                // alert("item " +
                // angular.toJson($item) +
                // "model:" + angular.toJson($model) +
                // "lable:" + angular.toJson($label)
                //
                // );
                if (actor.id != '-1') {
                    // alert("This is not a create statement");
                    var found = false;
                    for (var i = 0; i < self.scene.actors.length && !found; i++) {
                        if (actor.id == self.scene.actors[i]) {
                            found = true;
                        }
                    }
                    if (!found) {
                        console.log("scene-detail: self.scene.actors: " + angular.toJson(self.scene.actors));
                        // if (self.scene.actors == '-1') {
                        //     self.scene.actors = [];
                        // }
                        console.log("%c scene-detail: self.scene is " + angular.toJson(self.scene), 'background: #380; color: #bada55');


                        console.log("%c scene-detail: self.scene actors before push are: " + angular.toJson(self.scene.actors), 'background: #380; color: #bada55');
                        self.scene.actors.push(actor.id);
                        console.log("%c scene-detail: self.scene actors after push are: " + angular.toJson(self.scene.actors), 'background: #380; color: #bada55');


                        self.updateScene(self.scene);

                        scopeWatchService.addActorToList(actor);
                    }


                } else {

                    // alert("This is a create statment");
                    var newActor = new Actor();
                    newActor.name = actor.value;
                    newActor.scenes = [];
                    newActor.websites = [];
                    newActor.thumbnail = 'media/images/actor/Unknown/profile/profile.jpg';

                    // newActor.scenes.push(self.scene.id);
                    // alert("New actorTag name is:" + $item.value);
                    // alert(angular.toJson(newActorTag));
                    newActor.$save().then(function (res) {

                        self.scene.actors.push(res.id);
                        self.updateScene(self.scene);


                        scopeWatchService.addActorToList(res);
                        // self.updateActor(self.actor);
                    })

                }
            };

            self.videoWidth = 720;
            self.zoomUp = function zoomUp(zoomfactor) {
                self.videoWidth = self.videoWidth * zoomfactor
            };

            self.zoomDown = function zoomDown(zoomfactor) {
                self.videoWidth = self.videoWidth / zoomfactor
            };

            self.getNext = function () {
                console.log("scene-detail.componenet: sceneList is: " + angular.toJson(sceneList));
                if (sceneList.length > 1) {
                    var currentIndex = sceneList.indexOf(self.currentScene);
                    console.log("indexOf current is " + angular.toJson(sceneList.indexOf(self.currentScene)));
                    if (currentIndex < sceneList.length - 1) {
                        self.next = sceneList[currentIndex + 1];

                    } else {
                        self.next = sceneList[0];
                    }
                    console.log("scene-detail: next id is " + angular.toJson(self.next));
                }

            };


            self.getPrev = function () {
                if (sceneList.length > 1) {
                    var currentIndex = sceneList.indexOf(self.currentScene);
                    if (currentIndex > 0) {
                        self.prev = sceneList[currentIndex - 1];

                    } else {
                        self.prev = sceneList[sceneList.length - 1];
                    }
                    console.log("scene-detail: prev id is " + angular.toJson(self.prev));
                }

            };

            self.playScene = function () {

                return $http.get('play-scene/', {
                    params: {
                        sceneId: self.scene.id
                    }
                })
            };


            self.openFolder = function () {

                return $http.get('open-folder/', {
                    params: {
                        path: self.scene.path_to_dir
                    }
                })
            };
            
            self.generateSampleVideo = function (scene) {
                
                $http.get('ffmpeg/', {
                    params: {
                        generateSampleVideo: true,
                        sceneId: scene.id
                    }
                }).then(function (response) {
                    self.updatedSample = false;
                    self.updatedSample = true;
                }, function errorCallback(response) {
                    alert("Something went wrong!");
                });
            }


        }
    ]
});