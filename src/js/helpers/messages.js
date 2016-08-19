import { PromoOptions } from 'appSettings';


function generateLink(wishlist = [], forParents = false){
	const wishlistUrl = wishlist.map( item => item.id).join(',');

	let link = 	PromoOptions.url
				+ '?wishlist=' + wishlistUrl 
				+ (forParents ? '&parent=true' : '');

	return link;
}

function createMessages(peopleIds, message){
	const formData = new URLSearchParams();
	peopleIds.map( (id, i) => {
		formData.append('userIDs[' + i + ']', id);
	});		
	formData.append('message', message);

	return formData;
}

export function createMessagesArray(state, sendToFriends, sendToRelatives){

	const relativesIds = state.user.relatives.map( relative => relative.person.userId );
	const friendsIds = state.user.friends	
						.filter( friend => ( friend.sex === state.user.profile.sex ) )
						.map( friend => friend.id_str );

	const relativesText = 'Текст о том что создан список и <a href="' + generateLink(state.wishlist, true) + '">ссылка</a>';
	const friendsText = 'Текст о том что создан список и <a href="' + generateLink(state.wishlist) +'">ссылка</a>';

	const messagesArray = [];

	if (sendToRelatives === true && relativesIds.length > 0){
		messagesArray.push(createMessages(relativesIds, relativesText));
	}

	if (sendToFriends && friendsIds.length > 0){
		messagesArray.push(createMessages(friendsIds, friendsText));
	}

	return messagesArray;
}


export function createMessageToWall(state){
	
	const formData = new URLSearchParams();
	
	const text = 'Текст о том что создан список и <a href="' + generateLink(state.wishlist) + '">ссылка</a>';
		
	formData.append('body', text);
	
	return formData;
}
