package main

import (
	"github.com/99designs/gqlgen/graphql/handler"
	"github.com/99designs/gqlgen/graphql/playground"
	"github.com/go-chi/chi/v5"
	"github.com/go-chi/chi/v5/middleware"
	"github.com/go-chi/cors"
	"github.com/kai-matsudate/todo-app/backend/graph"
	"net/http"
)

var allowedOrigins = []string{
	"http://localhost:3080",
	"http://localhost:8080",
}

func NewRouter() *chi.Mux {
	r := chi.NewRouter()

	// Middleware
	r.Use(
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

	// Define GraphQL server
	srv := handler.NewDefaultServer(graph.NewExecutableSchema(graph.Config{Resolvers: &graph.Resolver{}}))
	r.Handle("/", playground.Handler("GraphQL playground", "/query"))
	r.Handle("/query", srv)

	return r
}
