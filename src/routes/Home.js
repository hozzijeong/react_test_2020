import axios from "axios";
import React from "react";
import Movie from "../component/Movie";
import "./Home.css";
// import PropTypes from "prop-types";
/*
  JSX & PROPS
  1. render는 한 개밖에 되지 않는다. 따라서 APP 안에서 모든 component정보를 처리하면 된다.
  2. props특징이 있는데, 이는 component의 파라미터로 변수를 받게 되고, 해당 컴포넌트에 key - value 형식으로 데이터를 
     저장 할 수 있다. 따라서, 해당 component에서 지정된 값으로 출력이 가능하다.

    ※component의 첫 번째 글자는 upper(대문자) 를 사용한다.
  
  map구조를 통해 배열 구조를 각각 하나씩 접근하여 적용이 가능하다.
  즉, playerInfo에 있는 정보들을 하나씩 분리하여, Info에 있는 파라미터에 접근 할 수 있도록 한다. 
  다만, react에서는 Info(component)들을 구분하지 못하므로, key = {element.id}의 형식으로 고유하게 구분 지어 줘야 에러가 나오지 않음.

  porpTypes:
    component에 사용되는 변수 혹은 데이터의 형태, 정보등을 확인하고, 검열이 가능하게 끔 제공하는 패키지.
    제공되는 변수의 타입 (string,number,array....) 혹은 제공되는 array안에 어떤 정보가 있는지를 확인 할 수 있는 패키지임. 
*/

/*
  ※react에서 새로운 setState를 실행할 때마다, render 메서드가 새롭게 실행이 됨.
  (render에서 실행된 event는 새로고침이 되지 않는다. 따라서 새롭게 실행을 해야한다.)

  component LifeCycle:
  1. Mounting: component가 최초 실행 되었을 때 (약간 안드로이드에서 attach or onCreate와 비슷)
    1-1 constructor(생성자) : 최초 실행
    1-2 render() : render 메서드 자동 실행
    1-3 componentDidMount() : render 메서드 실행되고 나서 실행
  2. Updating: 최초로 render 하지 않고, 앞선 예제처럼 setState를 통해 해당 class component에 변화가 주어졌을 때.
    2-1 render() : render 메서드가 실행 될 때
    2-2 componentDidUpadte(): Update 과정에서 render 메서드가 실행되고 나서 실행되는 메서드
  3. UnMounting: component가 종료될 때 (ex 페이지 종료, state를 통한 페이지 교체)


  handler와 같이 setTimeout 메서드를 이용해서 시간차 함수를 실행 시킬 수 있음.

  영화 API 가져오는 순서
  1. loading 이후 didMount에서 API 가져오는 구문 작성.
    1-1 영화 API에서 가져오는게 좀 느리기 때문에, async + await을 통해 해당 정보를 받아오기 전 까지는 아무것도 다음 행동을 취하지 않도록 설정
  2. 영화정보를 받아오면, state안에 movies라는 배열 안에 해당 정보 삽입 및 정보 띄우기
    2-1 정보 띄울 때 Props를 통해 정보 거르기 한번 해줌. 
*/

class Home extends React.Component{
  state = {
    isLoading: true,
    movies: []
  };

  getMovies = async() =>{
    const{data:
      {data:
        {movies}}} 
         = await axios.get("https://yts-proxy.now.sh/list_movies.json?sort_by=rating");
    this.setState({movies,isLoading: false});
  }
  
  componentDidMount() {
    this.getMovies();
  }

  render(){
    const {isLoading, movies} = this.state;
    return (
      <section className="container">
        {isLoading?(
        <div className="loader">
          <span className="loader__text">Loading...</span>
        </div>):
        (<div className="movies">
          {movies.map(movie=>(
          <Movie 
            key={movie.id}
            id={movie.id}
            year={movie.year}
            title={movie.title}
            summary={movie.summary}
            poster={movie.medium_cover_image}
            genres={movie.genres}
            />
        ))}
        </div>)  
      }
      </section>   
        );
    }

}

export default Home;
