import React from "react";
import "./style.scss";
import MyRating from "../MyRating/MyRating.jsx";
import { format } from "date-fns";
import axios from "../../utils/axios.js";
import { userContext } from "../../App.js";

const Reviews = ({ item }) => {
  const { setUser } = React.useContext(userContext);
  const originalDate = new Date(item.created_at);
  const formattedDate = format(originalDate, "dd.MM.yyyy");
  const [like, setLike] = React.useState(false);
  const [countLikes, setCountLikes] = React.useState(0);
  const [countDislikes, setCountDislikes] = React.useState(0);

  /* console.log(item, "item"); */

  const getlikes = () => {
    /*  axios
      .get(`/${item.id}/likeCount`)
      .then((res) => {
        console.log(res.data, 6699);
        const likesID = res.data;
        const ID = likesID.filter((ob) => ob.id === item.id);
        setCountLikes(ID);
      })
      .catch((error) => {
        alert(error);
      }); */
  };

  const getDislikes = () => {
    /*  axios
      .get(`/${item.product_id}/dislikeCount`)
      .then((res) => {
        const dislikesID = res;
        const gg = dislikesID.filter((ob) => ob.id === item.id);
        setCountDislikes(gg);
      })
      .catch((error) => {
        alert(error.response.data.message);
      }); */
  };

  const toMakeLikeDislike = (liked) => {
    if (localStorage.getItem("user") !== null) {
      setUser(JSON.parse(localStorage.getItem("user")));
    }
    axios
      .post(
        `/${item.id}/${liked}`,
        {
          is_liked: liked === "like" ? true : false,
          product_id: item.id,
        },
        {
          // це потрібно додавати до кожного запиту який потребує авторизованого юзера
          headers: {
            Authorization: `Bearer ${localStorage.getItem("userToken")}`,
          },
        }
      )
      .then((res) => {
        setLike({
          ...res.like,
        });
        getlikes();
        getDislikes();
      })
      .catch((error) => {
        alert(error.response.data.message);
      });
  };

  return (
    <div className="reviews">
      <div className="reviews__title">
        <p>{`${item.user.name} ${item.user.surname}`}</p>
        <MyRating rating={item.rate} />
        <span>{formattedDate}</span>
      </div>
      <p>{item.content}</p>
      <span>Advantages:</span>
      <p>{item.advantages}</p>
      <span>Disadvantages:</span>
      <p>{item.disadvantages}</p>
      <div className="reviews__reply">
        <div className="reviews__svg-reply">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
          >
            <path
              d="M15 10L20 15M20 15L15 20M20 15H8C6.93913 15 5.92172 14.5786 5.17157 13.8284C4.42143 13.0783 4 12.0609 4 11V4"
              stroke="#776EA4"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <span>reply</span>
        </div>
        <div className="reviews__svg-likes">
          <div className="reviews__svg-like">
            <svg
              onClick={() => toMakeLikeDislike("like")}
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clipPath="url(#clip0_1984_25879)">
                <path
                  d="M7 22H4C3.46957 22 2.96086 21.7893 2.58579 21.4142C2.21071 21.0391 2 20.5304 2 20V13C2 12.4696 2.21071 11.9609 2.58579 11.5858C2.96086 11.2107 3.46957 11 4 11H7M14 9V5C14 4.20435 13.6839 3.44129 13.1213 2.87868C12.5587 2.31607 11.7956 2 11 2L7 11V22H18.28C18.7623 22.0055 19.2304 21.8364 19.5979 21.524C19.9654 21.2116 20.2077 20.7769 20.28 20.3L21.66 11.3C21.7035 11.0134 21.6842 10.7207 21.6033 10.4423C21.5225 10.1638 21.3821 9.90629 21.1919 9.68751C21.0016 9.46873 20.7661 9.29393 20.5016 9.17522C20.2371 9.0565 19.9499 8.99672 19.66 9H14Z"
                  stroke="#776EA4"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </g>
              <defs>
                <clipPath id="clip0_1984_25879">
                  <rect width="24" height="24" fill="white" />
                </clipPath>
              </defs>
            </svg>
            <p>{countLikes}</p>
          </div>
          <div className="reviews__svg-like"></div>
          <svg
            onClick={() => toMakeLikeDislike("dislike")}
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g clipPath="url(#clip0_1984_25882)">
              <path
                d="M16.9991 1.99987H19.6691C20.235 1.98986 20.785 2.18801 21.2145 2.55669C21.644 2.92538 21.9232 3.43893 21.9991 3.99987V10.9999C21.9232 11.5608 21.644 12.0744 21.2145 12.4431C20.785 12.8117 20.235 13.0099 19.6691 12.9999H16.9991M9.99905 14.9999V18.9999C9.99905 19.7955 10.3151 20.5586 10.8777 21.1212C11.4403 21.6838 12.2034 21.9999 12.9991 21.9999L16.9991 12.9999V1.99987H5.71905C5.23673 1.99442 4.76868 2.16347 4.40115 2.47587C4.03362 2.78827 3.79138 3.22297 3.71905 3.69987L2.33905 12.6999C2.29555 12.9865 2.31488 13.2792 2.39571 13.5576C2.47655 13.8361 2.61695 14.0936 2.8072 14.3124C2.99744 14.5311 3.23297 14.7059 3.49748 14.8247C3.76199 14.9434 4.04915 15.0032 4.33905 14.9999H9.99905Z"
                stroke="#776EA4"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </g>
            <defs>
              <clipPath id="clip0_1984_25882">
                <rect width="24" height="24" fill="white" />
              </clipPath>
            </defs>
          </svg>
          <p>{countDislikes}</p>
        </div>
      </div>
    </div>
  );
};

export default Reviews;
