// scroll section 인터렉션에서 필요한 정보들
// [elem init, finish, {startTime, endTime}]
const sectionInfo = [
  //- 0
  {
    type: "sticky",
    height: 20, // 배수로 저장
    sectionHeight: 0, // 배수 * 컨테이너 섹션 높이
    elems: {
      section: document.querySelector("#scroll_section_0"),
      stickyMainA: document.querySelector("#scroll_section_0 .main_message.a"),
      stickyMainB: document.querySelector("#scroll_section_0 .main_message.b"),
      stickyMainC: document.querySelector("#scroll_section_0 .main_message.c"),
      stickyMainD: document.querySelector("#scroll_section_0 .main_message.d"),
      canvas: document.querySelector("#video_canvas_0"),
      context: document.querySelector("#video_canvas_0").getContext("2d"),
      videoImages: [],
    },
    animations: {
      // canvas
      videoImageCount: 300,
      imageSequence: [0, 299],
      canvasOpacity: [1, 0, { start: 0.9, end: 1 }],
      // opacity fade in
      msgAOpacityFadeIn: [0, 1, { start: 0.1, end: 0.2 }],
      msgBOpacityFadeIn: [0, 1, { start: 0.3, end: 0.4 }],
      msgCOpacityFadeIn: [0, 1, { start: 0.5, end: 0.6 }],
      msgDOpacityFadeIn: [0, 1, { start: 0.7, end: 0.8 }],
      // opacity fade out
      msgAOpacityFadeOut: [1, 0, { start: 0.25, end: 0.3 }],
      msgBOpacityFadeOut: [1, 0, { start: 0.45, end: 0.5 }],
      msgCOpacityFadeOut: [1, 0, { start: 0.65, end: 0.7 }],
      msgDOpacityFadeOut: [1, 0, { start: 0.85, end: 0.9 }],
      // translateY fade in
      msgA_translateY_fadeIn: [20, 0, { start: 0.1, end: 0.2 }],
      msgB_translateY_fadeIn: [20, 0, { start: 0.3, end: 0.4 }],
      msgC_translateY_fadeIn: [20, 0, { start: 0.5, end: 0.6 }],
      msgD_translateY_fadeIn: [20, 0, { start: 0.7, end: 0.8 }],
      // translateY fade out
      msgA_translateY_fadeOut: [0, -20, { start: 0.25, end: 0.3 }],
      msgB_translateY_fadeOut: [0, -20, { start: 0.45, end: 0.5 }],
      msgC_translateY_fadeOut: [0, -20, { start: 0.65, end: 0.7 }],
      msgD_translateY_fadeOut: [0, -20, { start: 0.85, end: 0.9 }],
    },
  },
  //- 1
  {
    type: "normal",
    height: 5,
    sectionHeight: 0, // 배수 * 컨테이너 섹션 높이
    elems: {
      section: document.querySelector("#scroll_section_1"),
    },
  },
  //- 2
  {
    type: "sticky",
    height: 20,
    sectionHeight: 0, // 배수 * 컨테이너 섹션 높이
    elems: {
      section: document.querySelector("#scroll_section_2"),
      stickyMainA: document.querySelector("#scroll_section_2 .main_message.a"),
      stickyDescB: document.querySelector("#scroll_section_2 .desc_message.b"),
      stickyDescC: document.querySelector("#scroll_section_2 .desc_message.c"),
      pinB: document.querySelector("#scroll_section_2 .b .pin"),
      pinC: document.querySelector("#scroll_section_2 .c .pin"),
      canvas: document.querySelector("#video_canvas_1"),
      context: document.querySelector("#video_canvas_1").getContext("2d"),
      videoImages: [],
    },
    // [elem init, finish, {startTime, endTime}]
    animations: {
      // canvas
      videoImageCount: 269,
      imageSequence: [0, 268],
      // opacity fade in
      canvasOpacityFadeIn: [0, 1, { start: 0, end: 0.1 }],
      msgAOpacityFadeIn: [0, 1, { start: 0.15, end: 0.2 }],
      msgBOpacityFadeIn: [0, 1, { start: 0.5, end: 0.55 }],
      msgCOpacityFadeIn: [0, 1, { start: 0.72, end: 0.77 }],
      // opacity fade out
      msgAOpacityFadeOut: [1, 0, { start: 0.3, end: 0.35 }],
      msgBOpacityFadeOut: [1, 0, { start: 0.58, end: 0.63 }],
      msgCOpacityFadeOut: [1, 0, { start: 0.85, end: 0.9 }],
      canvasOpacityFadeOut: [1, 0, { start: 0.95, end: 1 }],
      // translateY fade in
      msgA_translateY_fadeIn: [20, 0, { start: 0.15, end: 0.2 }],
      msgB_translateY_fadeIn: [30, 0, { start: 0.5, end: 0.55 }],
      msgC_translateY_fadeIn: [30, 0, { start: 0.72, end: 0.77 }],
      // translateY fade out
      msgA_translateY_fadeOut: [0, -20, { start: 0.3, end: 0.35 }],
      msgB_translateY_fadeOut: [0, -20, { start: 0.58, end: 0.63 }],
      msgC_translateY_fadeOut: [0, -20, { start: 0.85, end: 0.9 }],
      // pin scale y
      pinB_scaleY: [0.5, 1, { start: 0.5, end: 0.55 }],
      pinC_scaleY: [0.5, 1, { start: 0.72, end: 0.77 }],
      // pin opacity fade in
      pinB_opacity_fadeIn: [0, 1, { start: 0.5, end: 0.55 }],
      pinC_opacity_fadeIn: [0, 1, { start: 0.72, end: 0.77 }],
      // pin opacity fade out
      pinB_opacity_fadeOut: [1, 0, { start: 0.56, end: 0.63 }],
      pinC_opacity_fadeOut: [1, 0, { start: 0.85, end: 0.9 }],
    },
  },
  //- 3
  {
    type: "sticky",
    height: 30,
    sectionHeight: 0, // 배수 * 컨테이너 섹션 높이
    elems: {
      section: document.querySelector("#scroll_section_3"),
      stickyMainA: document.querySelector("#scroll_section_3 .main_message.a"),
      canvas: document.querySelector("#video_canvas_2"),
      context: document.querySelector("#video_canvas_2").getContext("2d"),
      videoImages: [],
    },
    // [elem init, finish, {startTime, endTime}]
    animations: {
      // canvas
      videoImageCount: 319,
      imageSequence: [0, 318],
      // opacity fade in
      canvasOpacityFadeIn: [0, 1, { start: 0, end: 0.1 }],
      msgAOpacityFadeIn: [0, 1, { start: 0.15, end: 0.2 }],
      // opacity fade out
      msgAOpacityFadeOut: [1, 0, { start: 0.3, end: 0.35 }],
      canvasOpacityFadeOut: [1, 0, { start: 0.9, end: 0.99 }],
      // translateY fade in
      msgA_translateY_fadeIn: [20, 0, { start: 0.15, end: 0.2 }],
      // translateY fade out
      msgA_translateY_fadeOut: [0, -20, { start: 0.3, end: 0.35 }],
    },
  },
  // - 4
  {
    type: "sticky",
    height: 1,
    sectionHeight: 0,
    elems: {
      section: document.querySelector("#scroll_section_4"),
    },
  },
];

export { sectionInfo };
