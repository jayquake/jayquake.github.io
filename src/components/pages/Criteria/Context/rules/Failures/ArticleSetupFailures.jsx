/* eslint-disable react/no-danger */
/**
 * AUTO-GENERATED from core-engine atomic-tests.
 * Source engine rule(s): article-misuse
 * Do not hand-edit example bodies — re-run:
 *   node scripts/generate-criteria-examples-from-atomic.js
 */
import React from "react";
import IssueFailure from "../../../../../layout/issueFailure";

const itemDescription = "Context: Article Setup - Failure";

const ArticleSetupFailures = () => (
  <IssueFailure
    itemContent={
      <>
        <div
          className="list-item"
          id="context-article-setup-failure-failure-1"
          data-atomic-source="article-misuse/article-header-short-content"
          dangerouslySetInnerHTML={{
            __html: `<article>
  <header>
    <h1>The Benefits of Semantic HTML</h1>
    <p class="date">Published on May 21, 2024 by Jane Doe</p>
  </header>
  <p>Short content</p>
</article>`,
          }}
        />
        <div
          className="list-item"
          id="context-article-setup-failure-failure-2"
          data-atomic-source="article-misuse/article-long-content-no-header"
          dangerouslySetInnerHTML={{
            __html: `<article>
  <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nulla quia consectetur esse? Mollitia excepturi officiis
    nostrum? Reprehenderit doloremque, molestias excepturi porro, facere voluptatem quibusdam commodi exercitationem
    laborum corrupti laboriosam culpa!</p>
  <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nulla quia consectetur esse? Mollitia excepturi officiis
    nostrum? Reprehenderit doloremque, molestias excepturi porro, facere voluptatem quibusdam commodi exercitationem
    laborum corrupti laboriosam culpa!</p>
  <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nulla quia consectetur esse? Mollitia excepturi officiis
    nostrum? Reprehenderit doloremque, molestias excepturi porro, facere voluptatem quibusdam commodi exercitationem
    laborum corrupti laboriosam culpa!</p>
  <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nulla quia consectetur esse? Mollitia excepturi officiis
    nostrum? Reprehenderit doloremque, molestias excepturi porro, facere voluptatem quibusdam commodi exercitationem
    laborum corrupti laboriosam culpa!</p>
  <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nulla quia consectetur esse? Mollitia excepturi officiis
    nostrum? Reprehenderit doloremque, molestias excepturi porro, facere voluptatem quibusdam commodi exercitationem
    laborum corrupti laboriosam culpa!</p>
  <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nulla quia consectetur esse? Mollitia excepturi officiis
    nostrum? Reprehenderit doloremque, molestias excepturi porro, facere voluptatem quibusdam commodi exercitationem
    laborum corrupti laboriosam culpa!</p>
  <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nulla quia consectetur esse? Mollitia excepturi officiis
    nostrum? Reprehenderit doloremque, molestias excepturi porro, facere voluptatem quibusdam commodi exercitationem
    laborum corrupti laboriosam culpa!</p>
</article>`,
          }}
        />
        <div
          className="list-item"
          id="context-article-setup-failure-failure-3"
          data-atomic-source="article-misuse/div-role-article-header-short-content"
          dangerouslySetInnerHTML={{
            __html: `<div role="article">
  <header>
    <h1>The Benefits of Semantic HTML</h1>
    <p class="date">Published on May 21, 2024 by Jane Doe</p>
  </header>
  <p>Short content</p>
</div>`,
          }}
        />
        <div
          className="list-item"
          id="context-article-setup-failure-failure-4"
          data-atomic-source="article-misuse/div-role-article-long-content-no-header"
          dangerouslySetInnerHTML={{
            __html: `<div role="article">
  <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nulla quia consectetur esse? Mollitia excepturi officiis
    nostrum? Reprehenderit doloremque, molestias excepturi porro, facere voluptatem quibusdam commodi exercitationem
    laborum corrupti laboriosam culpa!</p>
  <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nulla quia consectetur esse? Mollitia excepturi officiis
    nostrum? Reprehenderit doloremque, molestias excepturi porro, facere voluptatem quibusdam commodi exercitationem
    laborum corrupti laboriosam culpa!</p>
  <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nulla quia consectetur esse? Mollitia excepturi officiis
    nostrum? Reprehenderit doloremque, molestias excepturi porro, facere voluptatem quibusdam commodi exercitationem
    laborum corrupti laboriosam culpa!</p>
  <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nulla quia consectetur esse? Mollitia excepturi officiis
    nostrum? Reprehenderit doloremque, molestias excepturi porro, facere voluptatem quibusdam commodi exercitationem
    laborum corrupti laboriosam culpa!</p>
  <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nulla quia consectetur esse? Mollitia excepturi officiis
    nostrum? Reprehenderit doloremque, molestias excepturi porro, facere voluptatem quibusdam commodi exercitationem
    laborum corrupti laboriosam culpa!</p>
  <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nulla quia consectetur esse? Mollitia excepturi officiis
    nostrum? Reprehenderit doloremque, molestias excepturi porro, facere voluptatem quibusdam commodi exercitationem
    laborum corrupti laboriosam culpa!</p>
  <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nulla quia consectetur esse? Mollitia excepturi officiis
    nostrum? Reprehenderit doloremque, molestias excepturi porro, facere voluptatem quibusdam commodi exercitationem
    laborum corrupti laboriosam culpa!</p>
</div>`,
          }}
        />
      </>
    }
    itemDescription={itemDescription}
  />
);

export default ArticleSetupFailures;
