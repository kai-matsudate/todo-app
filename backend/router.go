package main

import (
	"github.com/go-chi/chi/v5"
	"github.com/go-chi/chi/v5/middleware"
	"github.com/go-chi/cors"
	"net/http"
)

var allowedOrigins = []string{
	// frontendURL
	"http://localhost:3080",
	// selfURL
	"http://localhost:8080",
}

func NewRouter() *chi.Mux {
	r := chi.NewRouter()
	r.Use(
		// corsの行は上の方に書いておかないと、後述がCORSエラーになる。
		cors.Handler(cors.Options{
			AllowedOrigins: allowedOrigins,
			AllowedMethods: []string{
				http.MethodGet,
				http.MethodPost,
				http.MethodPut,
				http.MethodPatch,
				http.MethodDelete,
				http.MethodOptions,
			},
			AllowedHeaders:   []string{"Accept", "Authorization", "Content-Type", "X-CSRF-Token"},
			AllowCredentials: true,
			Debug:            false,
			ExposedHeaders:   []string{"Link"},
			MaxAge:           300,
		}),
		middleware.Heartbeat("/health"),
	)

	r.Get("/", func(w http.ResponseWriter, r *http.Request) {
		w.Write([]byte("Hello World!"))
	})
	return r
}
