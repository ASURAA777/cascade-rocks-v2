"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/**
 * Single plugin-registration point, run at module-evaluation time (not
 * inside a useEffect). This matters: React fires child effects before
 * parent effects in the same commit, so registering ScrollTrigger inside
 * <Experience>'s own useLenis() effect ran *after* every child scene's
 * useScrollScene effect had already tried to use it — every
 * ScrollTrigger.create()/gsap.timeline({scrollTrigger}) call site failed
 * silently ("Please gsap.registerPlugin(ScrollTrigger)"), and the
 * document-scoped trigger in LightProgressionLayer crashed outright
 * ("_context is not a function") because ScrollTrigger's own internal
 * _initCore() never ran. Importing this module (an import statement
 * executes synchronously during module evaluation, before any effect can
 * fire) guarantees registration has already happened everywhere it's used.
 */
gsap.registerPlugin(ScrollTrigger);

export { gsap, ScrollTrigger };
