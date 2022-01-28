import { shallowMount, createLocalVue, mount } from "@vue/test-utils";
import Home from "@/views/Home.vue";
import VueRouter from "vue-router";
import API from "../../api";
import flushPromises from "flush-promises";

jest.mock("@/api");

function mountComponentConfig() {
  const localVue = createLocalVue();
  localVue.use(VueRouter);
  const router = new VueRouter();

  return {
    localVue,
    router,
  };
}

describe("Home.vue", () => {
  it("should render correct contents", () => {
    const componentCfg = mountComponentConfig();
    const wrapper = shallowMount(Home, componentCfg);
    expect(wrapper.exists()).toBeTruthy();
  });

  it("should render title correctly", async () => {
    const componentCfg = mountComponentConfig();
    const video = {
      id: 1,
      title: "Video 1",
      description: "Description 1",
      thumbnail: "https://via.placeholder.com/150",
    };

    API.getVideoList.mockResolvedValue([video]);

    const wrapper = mount(Home, componentCfg);
    await flushPromises();

    expect(wrapper.find("h3").text()).toBe(video.title);
  });
});
