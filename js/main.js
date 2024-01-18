import { sectionInfo } from "./sectionInfo.js";
import { setLayout, scrollObserver, playAnimation, setCanvasImages, calcAnimations, checkMenu } from "./module.js";

(() => {
  let yOffset = 0; // window.yOffset 대신 쓸 변수
  let prevScrollHeight = 0; // 현재위치보다 이전에 위치한 스크롤섹션들의 스크롤 높이 합.
  let isNewSectionChange = false;
  let currentSection = 0; // 나의 현재 위치가 어디섹션에 있는지 알려주는 변수

  //* 스크롤 감속 변수들
  let acc = 0.5; // 속도
  let delaydYOffset = 0; // 변화되는 스크롤 거리
  let rafId; // reqAnimation id
  let rafState;

  //- scroll 할때 감속효과를 주기위한 함수
  function scrollSpeedFunc() {
    delaydYOffset = delaydYOffset + (yOffset - delaydYOffset) * acc;
    if (!isNewSectionChange) {
      if (currentSection === 0 || currentSection === 2 || currentSection === 3) {
        const currentYOffset = delaydYOffset - prevScrollHeight;
        const elems = sectionInfo[currentSection].elems;
        const animations = sectionInfo[currentSection].animations;

        let sequence = Math.round(
          calcAnimations(animations.imageSequence, currentYOffset, sectionInfo, currentSection)
        );

        if (elems.videoImages[sequence]) {
          elems.context.drawImage(elems.videoImages[sequence], 0, 0);
        }
      }
    }

    rafId = requestAnimationFrame(scrollSpeedFunc);
    if (Math.abs(yOffset - delaydYOffset) < 1) {
      cancelAnimationFrame(rafId);
      rafState = false;
    }
  }

  window.addEventListener("load", () => {
    yOffset = setLayout(sectionInfo, yOffset);

    window.addEventListener("scroll", () => {
      yOffset = scrollY;
      checkMenu(yOffset);

      [prevScrollHeight, isNewSectionChange, currentSection, yOffset] = scrollObserver(
        prevScrollHeight,
        isNewSectionChange,
        sectionInfo,
        currentSection,
        yOffset
      );

      if (!isNewSectionChange) playAnimation(currentSection, sectionInfo, yOffset, prevScrollHeight);

      if (!rafState) {
        rafId = requestAnimationFrame(scrollSpeedFunc);
      }
    });
  });

  setCanvasImages(sectionInfo);
})();
