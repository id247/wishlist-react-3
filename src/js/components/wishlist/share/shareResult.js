import React from 'react';


const ShareResult = (props) => {

	const messages = {
		ok: {
			wall: () => (
				<p>
					Сохранили на вашу 
					{' '}
					<a 
						className="link" 
						href={(props.server + '/user/user.aspx?user=' + props.userId)}
					>
						стену
					</a>
				</p>
			),
			messages: () => (
				<p>
					Сообщения отправлены
				</p>
			)
		},
		error: {
			wall: () => (
				<p>
					Произошла ошибка, попробуйте снова
				</p>
			),
			messages: () => (
				<p>
					Произошла ошибка, попробуйте снова
				</p>
			)
		}
	};

	const content = props.status ? messages[props.status][props.share]() : null;

	return (
		<div className={( (props.mixClass ? props.mixClass : '') + ' ')}>
			{content}
		</div>
	);
}

ShareResult.propTypes = {
	mixClass: React.PropTypes.string,
	status: React.PropTypes.string,
	userId: React.PropTypes.string,

	share: React.PropTypes.string.isRequired,
	server: React.PropTypes.string.isRequired,
};

export default ShareResult;
