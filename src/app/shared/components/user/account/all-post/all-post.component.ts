import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { Post, User } from 'src/app/core/models/interface';
import { UserApiServiceService } from 'src/app/features/user/services/user-api.service.service';

@Component({
  selector: 'app-all-post',
  templateUrl: './all-post.component.html',
  styleUrls: ['./all-post.component.css'],
})
export class AllPostComponent implements OnInit, OnChanges {
  @Input() userId: string | undefined;
  @Input() type: Boolean = false;
  @Input() SavedPost: boolean = false;
  @Input() postCount: number | undefined;
  @Output() postCountChange: EventEmitter<number> = new EventEmitter<number>();
  @Output() onePost: EventEmitter<Post> = new EventEmitter<Post>();
  @Input() shorts: boolean = false;

  posts: any;

  constructor(private userApiServiceService: UserApiServiceService) {}

  ngOnInit(): void {
    this.getPost();
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['SavedPost']) {
      this.getPost();
    }
  }

  getPost = async () => {
    if (this.SavedPost && this.userId) {
      this.userApiServiceService
        .getSavedPost(this.userId)
        .subscribe((response) => {
          this.posts = response;
        });
    } else if (this.shorts && this.userId) {
      this.userApiServiceService
        .getUserShorts(this.userId)
        .subscribe(
          (response: {
            AllPosts: Post[];
            message: string;
            success: boolean;
          }) => {
            this.posts = response.AllPosts;
          }
        );
    } else {
      if (this.userId) {
        this.userApiServiceService
          .getUserAllPost(this.userId)
          .subscribe(
            ({
              AllPosts,
            }: {
              success: boolean;
              AllPosts: Post[];
              message: string;
            }) => {
              this.postCount = AllPosts.length;
              this.postCountChange.emit(this.postCount);
              this.posts = AllPosts;
            }
          );
      }
    }
  };
  getSavedOnePost(postData: Post, postUser: any) {
    postData.userId = postUser;
    postData.shortsCheck = false;
    this.onePost.emit(postData);
  }

  getSavedOneShorts(postData: Post, postUser: any) {
    postData.userId = postUser;
    postData.shortsCheck = true;
    this.onePost.emit(postData);
  }

  getOnePost(post: Post) {
    if (this.shorts) {
      post.shortsCheck = true;
    } else {
      post.shortsCheck = false;
    }
    this.onePost.emit(post);
  }
}
