
function validatePhone(string) {
  try {
    if (typeof string !== 'string' || !string) throw new Error('value is invalid.');
    return isMobilePhone(string, 'any', { strictMode: true });
  }
  catch (error) {
    throw error;
  }
}

function Role({
  role = 'basic',
  ROLES = ['admin', 'moderator', 'vip', 'premium', 'member', 'basic']
} = { role: 'basic', ROLES: ['admin', 'moderator', 'vip', 'premium', 'member', 'basic'] }) {
  try {
    if (new.target === undefined) return new Role({role, ROLES});

    Object.freeze(ROLES);

    // HELPER FUNCTIONS
    function validateRole(string) {
      try {
        if (typeof string === 'string' && string)
          return ROLES.includes(string);
        else return false;
      }
      catch (error) {
        throw error;
      }
    }

    // return new instance of Role <role object>
    return Object.defineProperties(this, {
      role: {
        value: role,
        configurable: true
      },
      set: {
        value: (string) => {
          try {
            string = string?.trim()?.toLowerCase();

            if (validateRole(string)) {
              Object.defineProperty(this, 'role', {
                value: string,
                configurable: true
              });
              return string;
            }
            else {
              throw new Error('role value is invalid.');
            }
          } catch (error) {
            throw error;
          }
        },
        enumerable: true
      },
      get: {
        value: () => {
          if (this.role) return this.role;
          else return null;
        },
        enumerable: true
      },
      validate: {
        value: validateRole,
        enumerable: true
      },
    });
  }
  catch (error) {
    throw error;
  }
}

export default Role;

// const role = new Role();
// console.log(role);
// console.log(role.get());
// console.log(role.validate('moderator'));
