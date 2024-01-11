// - 레이아웃을 세팅해주는 함수
export function setLayout(sectionInfo, yOffset) {
  // 1. 섹션들의 높이를 설정
  for (let i = 0; i < sectionInfo.length; i++) {
    if (sectionInfo[i].type === "sticky") {
      sectionInfo[i].sectionHeight = sectionInfo[i].height * innerHeight;
    } else if (sectionInfo[i].type === "normal") {
      sectionInfo[i].sectionHeight = sectionInfo[i].elems.section.offsetHeight;
    }
    sectionInfo[i].elems.section.style.height = `${sectionInfo[i].sectionHeight}px`;
  }
  // 2. yOffset을 변경
  yOffset = window.scrollY;

  // 3. canvas 스케일을 높이값에 맞게 조정
  const heightRatio = window.innerHeight / 1080;
  sectionInfo[0].elems.canvas.style.transform = `translate3d(-50%, -50%, 0) scale(${heightRatio})`;
  sectionInfo[2].elems.canvas.style.transform = `translate3d(-50%, -50%, 0) scale(${heightRatio})`;
  sectionInfo[3].elems.canvas.style.transform = `translate3d(-50%, -50%, 0) scale(${heightRatio})`;

  return yOffset;
}

//- 비디오 이미지를 sectionInfo의 이미지 배열에 저장하는 함수
export function setCanvasImages(sectionInfo) {
  // section 0
  let imgElem;
  for (let i = 0; i < sectionInfo[0].animations.videoImageCount; i++) {
    imgElem = new Image();
    imgElem.src = `./video/001/${i + 1}.jpg`;
    sectionInfo[0].elems.videoImages.push(imgElem);
  }

  // section 2
  let imgElem2;
  for (let i = 0; i < sectionInfo[2].animations.videoImageCount; i++) {
    imgElem2 = new Image();
    imgElem2.src = `./video/002/${652 + i}.jpg`;
    sectionInfo[2].elems.videoImages.push(imgElem2);
  }

  // section 3
  let imgElem3;
  for (let i = 0; i < sectionInfo[3].animations.videoImageCount; i++) {
    imgElem3 = new Image();
    imgElem3.src = `./video/003/${921 + i}.jpg`;
    sectionInfo[3].elems.videoImages.push(imgElem3);
  }
}

// - 스크롤할때마다 내가 어느위치에 있는지 감지하는 함수
export function scrollObserver(prevScrollHeight, isNewSectionChange, sectionInfo, currentSection, yOffset) {
  // 초기화
  prevScrollHeight = 0;
  isNewSectionChange = false;

  for (let i = 0; i < currentSection; i++) {
    prevScrollHeight += sectionInfo[i].sectionHeight;
  }

  const scrollSum = prevScrollHeight + sectionInfo[currentSection].sectionHeight;

  if (yOffset > scrollSum) {
    isNewSectionChange = true;
    currentSection++;
  }

  if (yOffset < prevScrollHeight) {
    isNewSectionChange = true;
    if (currentSection === 0) return;
    currentSection--;
  }

  document.body.setAttribute("id", `show_section_${currentSection}`);

  return [prevScrollHeight, isNewSectionChange, currentSection, yOffset];
}

// - 현재 섹션에서 스크롤 애니메이션을 실행시킬 함수
export function playAnimation(currentSection, sectionInfo, yOffset, prevScrollHeight) {
  if (sectionInfo[currentSection].type === "normal") return;

  // 변수
  const animations = sectionInfo[currentSection].animations;
  const elems = sectionInfo[currentSection].elems;
  const currentSectionY = yOffset - prevScrollHeight; // 현재섹션의 0 ~ 현재섹션높이를 알 수 있는 변수

  // 현재 섹션에서 내가 어디에있는지 0~1 비율로 나타냄
  const scrollRatio = currentSectionY / sectionInfo[currentSection].sectionHeight;

  // 섹션별 애니메이션 구동 switch
  switch (currentSection) {
    case 0:
      // canvas
      // let sequence = Math.round(calcAnimations(animations.imageSequence, currentSectionY, sectionInfo, currentSection));
      // elems.context.drawImage(elems.videoImages[sequence], 0, 0);

      elems.canvas.style.opacity = calcAnimations(
        animations.canvasOpacity,
        currentSectionY,
        sectionInfo,
        currentSection
      );

      // - message A
      if (scrollRatio <= 0.22) {
        // in
        const opacityFadeIn_msgA = calcAnimations(
          animations.msgAOpacityFadeIn,
          currentSectionY,
          sectionInfo,
          currentSection
        );
        const transformFadeIn_msgA = calcAnimations(
          animations.msgA_translateY_fadeIn,
          currentSectionY,
          sectionInfo,
          currentSection
        );

        elems.stickyMainA.style.opacity = opacityFadeIn_msgA;
        elems.stickyMainA.style.transform = `translate3d(0, ${transformFadeIn_msgA}%, 0)`;
      } else {
        // out
        const opacityFadeOut_msgA = calcAnimations(
          animations.msgAOpacityFadeOut,
          currentSectionY,
          sectionInfo,
          currentSection
        );
        const transformFadeOut_msgA = calcAnimations(
          animations.msgA_translateY_fadeOut,
          currentSectionY,
          sectionInfo,
          currentSection
        );
        elems.stickyMainA.style.opacity = opacityFadeOut_msgA;
        elems.stickyMainA.style.transform = `translate3d(0, ${transformFadeOut_msgA}%, 0)`;
      }
      // - message B
      if (scrollRatio <= 0.42) {
        // in
        const opacityFadeIn_msgB = calcAnimations(
          animations.msgBOpacityFadeIn,
          currentSectionY,
          sectionInfo,
          currentSection
        );
        const transformFadeIn_msgB = calcAnimations(
          animations.msgB_translateY_fadeIn,
          currentSectionY,
          sectionInfo,
          currentSection
        );
        elems.stickyMainB.style.opacity = opacityFadeIn_msgB;
        elems.stickyMainB.style.transform = `translate3d(0, ${transformFadeIn_msgB}%, 0)`;
      } else {
        // out
        const opacityFadeOut_msgB = calcAnimations(
          animations.msgBOpacityFadeOut,
          currentSectionY,
          sectionInfo,
          currentSection
        );
        const transformFadeOut_msgB = calcAnimations(
          animations.msgB_translateY_fadeOut,
          currentSectionY,
          sectionInfo,
          currentSection
        );
        elems.stickyMainB.style.opacity = opacityFadeOut_msgB;
        elems.stickyMainB.style.transform = `translate3d(0, ${transformFadeOut_msgB}%, 0)`;
      }
      // - message C
      if (scrollRatio <= 0.62) {
        // in
        const opacityFadeIn_msgC = calcAnimations(
          animations.msgCOpacityFadeIn,
          currentSectionY,
          sectionInfo,
          currentSection
        );
        const transformFadeIn_msgC = calcAnimations(
          animations.msgC_translateY_fadeIn,
          currentSectionY,
          sectionInfo,
          currentSection
        );
        elems.stickyMainC.style.opacity = opacityFadeIn_msgC;
        elems.stickyMainC.style.transform = `translate3d(0, ${transformFadeIn_msgC}%, 0)`;
      } else {
        // out
        const opacityFadeOut_msgC = calcAnimations(
          animations.msgCOpacityFadeOut,
          currentSectionY,
          sectionInfo,
          currentSection
        );
        const transformFadeOut_msgC = calcAnimations(
          animations.msgC_translateY_fadeOut,
          currentSectionY,
          sectionInfo,
          currentSection
        );
        elems.stickyMainC.style.opacity = opacityFadeOut_msgC;
        elems.stickyMainC.style.transform = `translate3d(0, ${transformFadeOut_msgC}%, 0)`;
      }
      // - message D
      if (scrollRatio <= 0.82) {
        // in
        const opacityFadeIn_msgD = calcAnimations(
          animations.msgDOpacityFadeIn,
          currentSectionY,
          sectionInfo,
          currentSection
        );
        const transformFadeIn_msgD = calcAnimations(
          animations.msgD_translateY_fadeIn,
          currentSectionY,
          sectionInfo,
          currentSection
        );
        elems.stickyMainD.style.opacity = opacityFadeIn_msgD;
        elems.stickyMainD.style.transform = `translate3d(0, ${transformFadeIn_msgD}%, 0)`;
      } else {
        // out
        const opacityFadeOut_msgD = calcAnimations(
          animations.msgDOpacityFadeOut,
          currentSectionY,
          sectionInfo,
          currentSection
        );
        const transformFadeOut_msgD = calcAnimations(
          animations.msgD_translateY_fadeOut,
          currentSectionY,
          sectionInfo,
          currentSection
        );
        elems.stickyMainD.style.opacity = opacityFadeOut_msgD;
        elems.stickyMainD.style.transform = `translate3d(0, ${transformFadeOut_msgD}%, 0)`;
      }
      break;
    case 2:
      // canvas
      // let sequence2 = Math.round(
      //   calcAnimations(animations.imageSequence, currentSectionY, sectionInfo, currentSection)
      // );
      // elems.context.drawImage(elems.videoImages[sequence2], 0, 0);

      //- message A
      if (scrollRatio <= 0.14) {
        // in
        const opacityFadeIn_msgA = calcAnimations(
          animations.msgAOpacityFadeIn,
          currentSectionY,
          sectionInfo,
          currentSection
        );
        const transformFadeIn_msgA = calcAnimations(
          animations.msgA_translateY_fadeIn,
          currentSectionY,
          sectionInfo,
          currentSection
        );
        elems.stickyMainA.style.opacity = opacityFadeIn_msgA;
        elems.stickyMainA.style.transform = `translate3d(0, ${transformFadeIn_msgA}%, 0)`;
      } else {
        // out
        const opacityFadeOut_msgA = calcAnimations(
          animations.msgAOpacityFadeOut,
          currentSectionY,
          sectionInfo,
          currentSection
        );
        const transformFadeOut_msgA = calcAnimations(
          animations.msgA_translateY_fadeOut,
          currentSectionY,
          sectionInfo,
          currentSection
        );

        elems.stickyMainA.style.opacity = opacityFadeOut_msgA;
        elems.stickyMainA.style.transform = `translate3d(0, ${transformFadeOut_msgA}%, 0)`;
      }
      // - canvas
      if (scrollRatio <= 0.5) {
        // in
        elems.canvas.style.opacity = calcAnimations(
          animations.canvasOpacityFadeIn,
          currentSectionY,
          sectionInfo,
          currentSection
        );
      } else {
        // out
        elems.canvas.style.opacity = calcAnimations(
          animations.canvasOpacityFadeOut,
          currentSectionY,
          sectionInfo,
          currentSection
        );
      }

      //- desc message B
      if (scrollRatio <= 0.57) {
        // in
        const transformFadeIn_msgB = calcAnimations(
          animations.msgB_translateY_fadeIn,
          currentSectionY,
          sectionInfo,
          currentSection
        );
        const opacityFadeIn_msgB = calcAnimations(
          animations.msgBOpacityFadeIn,
          currentSectionY,
          sectionInfo,
          currentSection
        );
        const opacityFadeIn_pinB = calcAnimations(
          animations.pinB_opacity_fadeIn,
          currentSectionY,
          sectionInfo,
          currentSection
        );
        const scale_pinB = calcAnimations(animations.pinB_scaleY, currentSectionY, sectionInfo, currentSection);

        elems.stickyDescB.style.opacity = opacityFadeIn_msgB;
        elems.stickyDescB.style.transform = `translate3d(0, ${transformFadeIn_msgB}%, 0)`;
        elems.pinB.style.transform = `scaleY(${scale_pinB})`;
      } else {
        // out
        const transformFadeOut_msgB = calcAnimations(
          animations.msgB_translateY_fadeOut,
          currentSectionY,
          sectionInfo,
          currentSection
        );
        const opacityFadeOut_msgB = calcAnimations(
          animations.msgBOpacityFadeOut,
          currentSectionY,
          sectionInfo,
          currentSection
        );
        const opacityFadeOut_pinB = calcAnimations(
          animations.pinB_opacity_fadeOut,
          currentSectionY,
          sectionInfo,
          currentSection
        );
        const scale_pinB = calcAnimations(animations.pinB_scaleY, currentSectionY, sectionInfo, currentSection);

        elems.stickyDescB.style.opacity = opacityFadeOut_msgB;
        elems.stickyDescB.style.transform = `translate3d(0, ${transformFadeOut_msgB}%, 0)`;
        elems.pinB.style.transform = `scaleY(${scale_pinB})`;
      }

      // - desc message C
      if (scrollRatio <= 0.63) {
        // in
        const transformFadeIn_msgC = calcAnimations(
          animations.msgC_translateY_fadeIn,
          currentSectionY,
          sectionInfo,
          currentSection
        );
        const opacityFadeIn_msgC = calcAnimations(
          animations.msgCOpacityFadeIn,
          currentSectionY,
          sectionInfo,
          currentSection
        );
        const scale_pinC = calcAnimations(animations.pinC_scaleY, currentSectionY, sectionInfo, currentSection);

        elems.stickyDescC.style.opacity = opacityFadeIn_msgC;
        elems.stickyDescC.style.transform = `translate3d(0, ${transformFadeIn_msgC}%, 0)`;
        elems.pinC.style.transform = `scaleY(${scale_pinC})`;
      } else {
        // out
        const transformFadeOut_msgC = calcAnimations(
          animations.msgC_translateY_fadeOut,
          currentSectionY,
          sectionInfo,
          currentSection
        );
        const opacityFadeOut_msgC = calcAnimations(
          animations.msgCOpacityFadeOut,
          currentSectionY,
          sectionInfo,
          currentSection
        );
        const scale_pinC = calcAnimations(animations.pinC_scaleY, currentSectionY, sectionInfo, currentSection);

        elems.stickyDescC.style.opacity = opacityFadeOut_msgC;
        elems.stickyDescC.style.transform = `translate3d(0, ${transformFadeOut_msgC}%, 0)`;
        elems.pinC.style.transform = `scaleY(${scale_pinC})`;
      }
      break;
    case 3:
      // - canvas
      if (scrollRatio <= 0.5) {
        // in
        elems.canvas.style.opacity = calcAnimations(
          animations.canvasOpacityFadeIn,
          currentSectionY,
          sectionInfo,
          currentSection
        );
      } else {
        // out
        elems.canvas.style.opacity = calcAnimations(
          animations.canvasOpacityFadeOut,
          currentSectionY,
          sectionInfo,
          currentSection
        );
      }
      break;
  }
}

// - 내가 animation구간에 있는지 확인하면서 내 위치를 비율로 바꿔서 애니요소를 계산
export function calcAnimations(animation, currentSectionY, sectionInfo, currentSection) {
  // return 해줄 변수
  let returnValue;

  const sectionHeight = sectionInfo[currentSection].sectionHeight;
  let ratio = currentSectionY / sectionHeight;

  // start end 옵션이 있으면 length === 3
  if (animation.length === 3) {
    const scrollStart = animation[2].start * sectionHeight; // 애니시작점
    const scrollEnd = animation[2].end * sectionHeight; // 애니끝점
    const animationPlayHeight = scrollEnd - scrollStart; // 애니구동구간

    if (currentSectionY >= scrollStart && currentSectionY <= scrollEnd)
      returnValue =
        ((currentSectionY - scrollStart) / animationPlayHeight) * (animation[1] - animation[0]) + animation[0];
    else if (currentSectionY < scrollStart) returnValue = animation[0];
    else if (currentSectionY > scrollEnd) returnValue = animation[1];
  } else {
    returnValue = ratio * (animation[1] - animation[0]) + animation[0];
  }

  return returnValue;
}

export function checkMenu(yOffset) {
  if (yOffset > 44) {
    document.body.classList.add("local_nav_sticky");
  } else {
    document.body.classList.remove("local_nav_sticky");
  }
}
