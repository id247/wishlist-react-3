export const OAuthOptions = {
	server: 'staging.dnevnik.ru',
	authUrl: 'https://login.staging.dnevnik.ru/oauth2',
	grantUrl: 'https://api.staging.dnevnik.ru/v1/authorizations',
	scope: 'Avatar,FullName,Birthday,Age,Roles,Schools,Organizations,EduGroups,Lessons,Marks,EduWorks,Relatives,Files,Contacts,Friends,Groups,Networks,Events,Wall,Messages,EmailAddress,Sex,SocialEntityMembership',	
	clientId: '5123975fe9eb415390fb7aa316a15e4e',
	modalRedirectUrl: '//localhost:9000/oauth.html',
	redirectUrl: '//localhost:9000/',
}

export const APIoptions = {	
	server: 'staging.dnevnik.ru',
	base: 'https://api.staging.dnevnik.ru/v1/',
}
