from django.urls import path

from .views import (PostApiViews,
                    PostDetailApiView,
                    CreatePostAPiView,
                    PostEditApiView,
                    LikePost,
                    SavePost,
                    GetPostLike,
                    GetPostLikeApiView,
                    GetSavePost,
                    GetPostSaveApiView,)


urlpatterns = [
    path("", PostApiViews.as_view(), name="index"),
    # post url
    path("<int:pk>/detail/", PostDetailApiView.as_view(), name="detail"),
    path('<int:pk>/edit/',PostEditApiView.as_view(),name='edit'),
    path("create/", CreatePostAPiView.as_view(), name="create"),
    # like and save action create
    path("like/", LikePost.as_view(), name="like"),
    path("save/", SavePost.as_view(), name="save_post"),
    # data save post
    path("save/post/", GetSavePost.as_view(), name="Post-save_post"),
    # user detail like and save
    path("post/like/", GetPostLike.as_view(), name="getPost"),
    path("post/save/", GetPostSaveApiView.as_view(), name="savePost"),

]
