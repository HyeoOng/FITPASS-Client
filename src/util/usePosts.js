import { ref, } from 'vue';
import { usePhotoStore } from '@/stores/photo';


export function usePosts() {

  const photoStore = usePhotoStore();
  
  const posts = ref([]);
  // const publicPosts = ref([]);
  // const friendPosts = ref([]);
  const totalPages = ref(1);
  const imageRefUrls = ref([]);

    // 글을 불러오는 함수
  const loadPosts = async (fetchPostsFn, currentPage, postsPerPage) => {
    try{
      const resp = await fetchPostsFn(currentPage, postsPerPage);
      if (resp?.value && Array.isArray(resp.value.content)) {
        const content = resp.value.content;
        posts.value = Array.isArray(content) ? content : [content]; // 배열로 변환
        totalPages.value = resp.value.totalPages;

        // 각 포스트에 대해 이미지 로드
        posts.value.forEach((post, idx) => {
          loadImage(post, idx);
        });
      } else {
        console.warn("서버에서 예상치 못한 응답을 받았습니다.");
        posts.value = [];
      }
    } catch (error) {
      console.error("posts 불러오는 중 에러 발생: ", error);
    }
  }
  // 게시글 이미지 로드
  const loadImage = async (post, idx) => {
    //console.log("post in loadImg function:", post)
    try {
      const blobUrl = await photoStore.getPhoto(post.photoUrl);
      if (blobUrl) {
        imageRefUrls.value[idx] = blobUrl;
      } else {
        alert('blobUrl 없다... in 124')
      }
    } catch (error) {
      console.error(error)
    }
  }


  return {posts, imageRefUrls, totalPages, loadPosts}
}