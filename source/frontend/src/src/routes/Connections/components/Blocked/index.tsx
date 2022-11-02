import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Link } from 'react-router-dom';

import fetch from '@/bundles/fetch';
import { Scroller } from '@/bundles/scroller';

import ProfilePicture from '@/components/ProfilePicture';

import { BlockedFields, BlockedState } from './index.interface';
import styles from './index.styles.scss';


export default class Blocked extends React.Component {
	protectState: boolean;
	state: BlockedState;
	loader: React.RefObject<HTMLDivElement>;
	scroller: Scroller;

	constructor(props: any) {
		super(props);

		this.state = {};

		this.scroller = new Scroller;
		this.loader = React.createRef<HTMLDivElement>();

		this.protectState = false;

		/* handlers */
		this.onScroll = this.onScroll.bind(this);
		this.onUnblock = this.onUnblock.bind(this);

		/* setters */
		this.setProtectedState = this.setProtectedState.bind(this);
		this.setRequests = this.setRequests.bind(this);

		/* methods */
		this.openProtectedState = this.openProtectedState.bind(this);
		this.closeProtectedState = this.closeProtectedState.bind(this);
	}

	componentDidMount() {
		this.openProtectedState();

		this.scroller.start(this.loader.current, this.onScroll);
	}

	componentDidCatch(error: any, errorInfo: any) {
		console.error(error, errorInfo);
	}

	componentWillUnmount() {
		this.closeProtectedState();
	}


	/* handlers */
	async onScroll() {
		const { requests } = this.state;

		const last = Number(requests?.at(-1)?.id);

		const data = await fetch.request.json<BlockedFields[]>('/connections/blocked', { last: Number.isNaN(last) ? undefined : last });

		if (!data)
			return true;

		const source = (requests || []);
		const target = (data || []);
		this.setRequests(source.concat(target));

		return target.length >= 20;
	}

	async onUnblock(props: Record<string, any>) {
		const { requests } = this.state;

		await fetch.request.json('/connections/remove_block', { user_id: props.user.id });

		this.setProtectedState({
			requests: (requests || []).filter((request: any) => request.id != props.id)
		});
	}


	/* setters */
	setProtectedState(props: Record<string, any>, callback?: (() => void)) {
		if (this.protectState) this.setState(props, callback);
	}

	setRequests(requests: Record<string, any>[]) {
		this.setProtectedState({ requests });
	}


	/* methods */
	openProtectedState() { this.protectState = true; }

	closeProtectedState() { this.protectState = false; }


	render() {
		const { requests } = this.state;

		return (
			<>
				<div className={styles.container}>
					{
						requests &&
						<>
						{
							requests.length > 0 &&
							requests.map((request) => (
								<div key={uuidv4()} className={styles.item}>
									<Link to={`/${request.user.username}`}>
										<div className={styles.presentation}>
											<ProfilePicture variant={styles.profile_picture} src={request.user.avatar} />
											<div className={styles.name}>
												<span className={styles.display_name} unselectable="on">{`${request.user.display_name}`}</span>
												<span className={styles.username} unselectable="on">{`@${request.user.username}`}</span>
											</div>
										</div>
										<div className={styles.separation} />
									</Link>
									<div className={styles.action}>
										<button onClick={this.onUnblock.bind(this, request)} unselectable="on">Unblock</button>
									</div>
								</div>
							))
						}
						{
							!requests.length &&
							<div className={styles.empty}>
								<span unselectable="on">No one blocked yet</span>
							</div>
						}
						</>
					}
				</div>
				<div ref={this.loader} />
			</>
		)
	}
}