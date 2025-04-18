package com.pbl5.gympose.utils;

public final class ApiPath {
    public static final String API = "/api/v1";

    // AUTH
    public static final String AUTH = API + "/auth";
    public static final String SIGN_UP = "/sign-up";
    public static final String LOGIN = "/login";
    public static final String VERIFY_ACCOUNT = "/verify-account";
    public static final String LOGOUT = "/logout";

    // CATEGORY
    public static final String CATEGORIES = API + "/categories";
    public static final String CATEGORY_BY_ID = "/{category-id}";

    // EXERCISE
    public static final String EXERCISES = API + "/exercises";
    public static final String EXERCISE_BY_ID = "/{exercise-id}";

    // IMAGE
    public static final String UPLOAD_IMAGE = "/upload-image";

    //CATEGORY'S EXERCISES
    public static final String CATEGORY_EXERCISES = API + "/categories/{category-id}/exercises";

    // USER
    public static final String USERS = API + "/users";
    public static final String USER_BY_ID = "/{user-id}";
    public static final String USER_PROFILE = "/profile";

    // SWAGGER
    public static final String SWAGGER = "/swagger-ui.html";

    private ApiPath() {
    }
}
