$(document).ready(function () {
						var mySwiper1 = new Swiper ('.room_pic', {
						    pagination: '.swiper-pagination',
						    paginationType : 'fraction',
						  });
						var mySwiper2 = new Swiper ('#near_cater', {
						    slidesPerView : 1.5,
						    centeredSlides : true,
						  });
					});
// $("#myCalendar-1").ionCalendar({
//     lang: "ch",               
//     sundayFirst: false,         
//     years: "80",                   
//     format: "DD.MM.YYYY",           
//     onClick: function(date){        
//         console.log(date);
//     }
// });
gradeObj.init();
var liNodeHeight=$('.hidesome_node li').eq(1).height();  
var ulHeight=Math.ceil(liNodeHeight*$('.hidesome_node li').length/3);
showmoreObj.init();