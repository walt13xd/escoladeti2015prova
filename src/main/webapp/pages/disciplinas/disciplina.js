module = angular.module("Disciplina", []);

module.controller("DisciplinaController", ["$scope","$http", DisciplinaController]);

function DisciplinaController($scope,$http) {
    
    $scope.iniciar = funcaoIniciar;
    $scope.salvar = funcaoSalvar;
    $scope.excluir = funcaoExcluir;
    $scope.editar = funcaoEditar;
    
    $scope.disciplinas = [];
    $scope.disciplina = {};
    $scope.isNovo = true;
    
    function funcaoEditar(disciplina) {
        $scope.disciplina = angular.copy(disciplina);
        $scope.isNovo = false;
    }
    
    function funcaoExcluir(disciplina) {
        $http.remove("/disciplinas",disciplina.id).success(onSuccess).error(onError);
        
        function onSuccess(data, status) {
            console.log(data);
            $scope.disciplina = {};
        }
        function onError(data, status) {
            alert("Deu erro: " + data);
        }
    }
    
    function funcaoSalvar() {
        if($scope.isNovo === true){
            $http.post("/disciplinas").success(onSuccess).error(onError);
        }else{
            $http.put("/disciplinas").success(onSuccess).error(onError);
        }
        function onSuccess(data, status) {
            $scope.disciplinas = data;       
            console.log(data);
            $scope.isNovo = true;
        }
        function onError(data, status) {
            alert("Deu erro: " + data);
        }
    }
    
    function funcaoCarregar() {
        $http.get("/disciplinas").success(onSuccess).error(onError);
        
        function onSuccess(data, status) {
            $scope.disciplinas = data;       
            console.log(data);
        }
        function onError(data, status) {
            alert("Deu erro: " + data);
        }
    }
    
    function funcaoIniciar() {
        funcaoCarregar();
        console.log(">>> Disciplinas carregadas....");
    }
}