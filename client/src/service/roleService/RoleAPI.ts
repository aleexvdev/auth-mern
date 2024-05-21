export const RoleAPI = {
  getRoles: () => {
    return [
      { id: "66359b14d8c7921d418ca076", name: 'admin' },
      { id: "66359b14d8c7921d418ca074", name: 'user' },
      { id: "66359b14d8c7921d418ca075", name: 'moderator' },
    ]
  },
  getRoleById: (id: string) => {
    return RoleAPI.getRoles().find(role => role.id === id)
  }
}