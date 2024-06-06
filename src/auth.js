//! function get html form because we create modal dinamyc

export function getAuthForm() {
	return `
   <form id="auth-form" class="mui-form">
      <div class="mui-textfield mui-textfield--float-label">
         <input
            id="email"
            required
            type="email"
         />
         <label for="email">Email:</label>
      </div>
      <div class="mui-textfield mui-textfield--float-label">
         <input
            id="password"
            required
            type="password"
         />
         <label for="password">Парол:</label>
      </div>
      <button
         id="submit"
         type="submit"
         class="mui-btn mui-btn--raised mui-btn--primary"
      >
         Войти
      </button>
   </form>
   `;
}

export function authWithEmailAndPassword(email, password) {
	const apiKey = 'AIzaSyCWnytGGLUXcUUj82bo8HHI1ZyQhZAuTrk';

	const authData = {
		email,
		password,
		returnSecureToken: true,
	};

	return fetch(
		`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${apiKey}`,
		{
			method: 'POST',
			body: JSON.stringify(authData),
			headers: {
				'Content-Type': 'application/json',
			},
		}
	)
		.then((res) => res.json())
		.then((res) => res.idToken);
}
