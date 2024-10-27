package entity

import (
	"strconv"

	"github.com/kai-matsudate/todo-app/backend/graph/model"
)

func (a *AdminUser) ToResponse() *model.AdminUser {
	return &model.AdminUser{
		ID:       strconv.Itoa(int(a.ID)),
		Name:     a.Name,
		Furigana: a.Furigana,
		Email:    a.Email,
	}
}

func (a *AdminUser) SetPassword(pw, pwPepper string) (*AdminUser, error) {
	hashed, err := password.GenerateHashedPassword(pw, pwPepper)
	if err != nil {
		return a, err
	}

	a.EncryptedPassword = string(hashed)
	return a, nil
}
