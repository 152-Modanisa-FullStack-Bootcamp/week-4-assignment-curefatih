import { shallowMount, createLocalVue, mount } from "@vue/test-utils";
import VideoCard from "@/components/VideoCard.vue";
import VueRouter from "vue-router";

function mountComponentConfig() {
  const localVue = createLocalVue();
  localVue.use(VueRouter);
  const router = new VueRouter();

  return {
    localVue,
    router,
    propsData: {
      video: {},
    },
  };
}

describe("VideoCard.vue", () => {
  it("should render correct contents", () => {
    const componentCfg = mountComponentConfig();
    const wrapper = shallowMount(VideoCard, componentCfg);
    expect(wrapper.exists()).toBeTruthy();
  });

  it("should have title", () => {
    const componentCfg = mountComponentConfig();

    componentCfg.propsData = {
      video: {
        title: "Video",
      },
    };

    const wrapper = mount(VideoCard, componentCfg);
    expect(wrapper.find("h3").text()).toBe("Video");
  });

  it("should have img", () => {
    const componentCfg = mountComponentConfig();

    const coverImage = "https://i.ytimg.com/vi/Z0UODjQw5pE/hqdefault.jpg";
    componentCfg.propsData = {
      video: {
        coverImage,
      },
    };

    const wrapper = mount(VideoCard, componentCfg);
    expect(wrapper.find("img").attributes("src")).toBe(coverImage);
  });

  it("when user click video should navigate to video watch page", async () => {
    const navigateToVideo = jest.spyOn(VideoCard.methods, "navigateToVideo");

    const video = {
      id: 1,
    };

    let routerPushMock = jest.fn();

    const wrapper = shallowMount(VideoCard, {
      propsData: {
        video,
      },
      mocks: {
        $router: {
          push: routerPushMock,
        },
      },
    });

    await wrapper.trigger("click");

    expect(navigateToVideo).toBeCalled();
    expect(routerPushMock).toHaveBeenCalledWith({
      name: "Watch",
      query: {
        id: video.id,
      },
    });
  });

  it("when hover video img should show hover image", async () => {
    const video = {
      id: 1,
      coverImage:
        "https://raw.githubusercontent.com/modanisa/bootcamp-video-db/main/video-images/1-cover.webp",
      hoverImage:
        "https://raw.githubusercontent.com/modanisa/bootcamp-video-db/main/video-images/1-hover.webp",
    };

    const wrapper = mount(VideoCard, {
      propsData: {
        video,
      },
    });

    expect(wrapper.find(".video-img").isVisible()).toBe(false);

    const coverImage = wrapper.find(".cover-image");
    expect(coverImage.attributes("src")).toBe(video.coverImage);
    await coverImage.trigger("mouseover");
    expect(coverImage.attributes("src")).toBe(video.hoverImage);
  });
});
